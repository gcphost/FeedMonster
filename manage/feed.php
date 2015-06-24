<?php
/*
	Created by William Bowman, 9/18/2014
	https://github.com/gcphost/phpRssAggregator/
*/

chdir('..');
require_once('classes/settings.php');

class Aggregator{
	var $similarity='75';	# %
	var $debugging=true;
	var $cache=true;
	
	var $feeds=array();
	var $results=array();
	var $titles=array();
	var $links=array();
	var $feedid,$author, $authorLink, $db, $cat, $catid;
	var $usermode=false;

	public function __construct(){
		$this->cat=!empty($this->cat) ? $this->cat : 'topstories';
		$this->db=new Database();
		if($this->debugging == false) error_reporting(0);
	}

	public function all(){
		foreach($this->cats as $cat){
			$this->cat=$cat;
			$this->catid();
			$this->run($this->db->getFeeds($this->cat));
			$this->db->setCatUpdated($this->catid);
			if($this->debugging) echo "\n$cat: stopped\n";
		}
	}

	public function client(){
		$this->usermode=true;
		$user=$this->db->getUsers();
		foreach($user as $users){
			$this->feeds=array();
			$this->cat=$users['uuid'];
			$this->catid=$users['id'];
			$this->run($this->db->getUserFeedsProcess($this->catid));
			$this->db->setFeedUpdated($this->cat);
			if($this->debugging) echo "\nclient: stopped\n";
			usleep(700000);
		}

	}

	public function setCats($cats=array()){
		$this->cats=$cats;
	}

	public function run($feed){
		$this->results=array();
		$this->process($feed);
	}

	public function fetch($rss){
		$results=array();
		libxml_use_internal_errors(true);
		if($feed=simplexml_load_file($rss,"SimpleXMLElement")){
			$namespaces = $feed->getNamespaces(true);
			if(isset($feed->channel->item)){
				foreach ($feed->channel->item as $news){
					if(!empty($namespaces['media'])){
						$image=false;
						$ns_media = $news->children($namespaces['media']);

						foreach($ns_media as $a=>$b){
							$c=$b->attributes();
							if(isset($c->thumbnail)) $news->image=$c->thumbnail;
							if(isset($c->url)) $news->image=$c->url;
						}
					}
				}
				return json_decode(json_encode($feed), true);
			}
		} else return array();
	}

	public function catid(){
		$catinfo=$this->db->getCat($this->cat);
		$this->catid=$catinfo['id'];
	}

	public function process($feed){
		foreach($feed as $feedid=>$rss){
			if(!$rss){ 
				$this->db->unlock($this->feedid);
				continue;
			}
			$this->feedid=$feedid;
			if($this->debugging) echo "#################### PROCESSING: #".$this->feedid ." url:$rss\n";

			$feed=$this->fetch($rss);

			if(isset($feed['channel']['item']) && is_array($feed['channel']['item'])){
				foreach($feed['channel']['item'] as $i=>$d){
					$this->build($d);
					$this->db->setFeedUpdated($this->feedid);
				}

			} else {

				$d=$this->tags($rss);
				if(!empty($d['title']) && !empty($d['description'])){
					$d['link']=$rss;
					$d['feedid']=$this->feedid;
					$d['image']=$this->xhtmlimage($rss);

					$this->build($d);
					$this->db->setFeedUpdated($this->feedid);
				}

			}

			$this->db->unlockFeed($this->feedid);
			$this->db->setFeedUpdated($this->feedid);
			$this->db->unlock($this->feedid);
			if($this->debugging) echo "#################### PROCESSING COMPLETE: #".$this->feedid ."\n";

		}
			
	}

	private function xhtmlimage($url){
		$image_name='images/'.md5($url.time()).'.jpg';
		$wkhtmltoimage= DIRECTORY_SEPARATOR == '\\' ? 'resources'.DIRECTORY_SEPARATOR .'wkhtmltoimage' : 'wkhtmltoimage';
		$run=exec($wkhtmltoimage.' --crop-h 480 --width 480 --format jpg --quality 80 '.$url.' '.$image_name);
		return $image_name;
	}

	public function getKeywords($string){
		  $stopWords = array('i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of','on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www',
		  'very',
		  'eventfull',
		  'tweets',
		  'buzzfeed',
			 'google',

		  
		  );
	   
		  $string = preg_replace('/\s\s+/i', '', $string); // replace whitespace
		  $string = trim($string); // trim the string
		  $string = preg_replace('/[^a-zA-Z0-9 -]/', '', $string); // only take alphanumerical characters, but keep the spaces and dashes too…
		  $string = strtolower($string); // make it lowercase
	   
		  preg_match_all('/\b.*?\b/i', $string, $matchWords);
		  $matchWords = $matchWords[0];
		  
		  foreach ( $matchWords as $key=>$item ) {
			  if ( $item == '' || in_array(strtolower($item), $stopWords) || strlen($item) <= 3 ) {
				  unset($matchWords[$key]);
			  }
		  }   
		  $wordCountArr = array();
		  if ( is_array($matchWords) ) {
			  foreach ( $matchWords as $key => $val ) {
				  $val = strtolower($val);
				  if ( isset($wordCountArr[$val]) ) {
					  $wordCountArr[$val]++;
				  } else {
					  $wordCountArr[$val] = 1;
				  }
			  }
		  }
		  arsort($wordCountArr);
		  $wordCountArr = array_slice($wordCountArr, 0, 10);
		  return $wordCountArr;
	}


	public function build($d){
		if(!is_string($d['link'])) return false;


		$tags=$this->tags($d['link']);
		$title=$this->title($d, $tags);
		$link=$this->url($d, $tags);
		$description=$this->description($d, $tags);
		$image=$this->image($d, $tags, $description);
		
		$_id=$this->db->linkIsCached($d['link'], $title);
		if($_id != false && $this->cache != false){
			if($this->debugging) echo "# Cached: ".substr($d['link'],0, 100)."\n";
 			$this->db->setLinkId($_id, $this->feedid);
			usleep(700000);

		} else {
			$tags=$this->tags($d['link']);
			$title=$this->title($d, $tags);
			$link=$this->url($d, $tags);
			$description=$this->description($d, $tags);
			$image=$this->image($d, $tags, $description);

			$_id=$this->db->linkIsCached($link, $title);
			if($_id != false && $this->cache != false){
				if($this->debugging) echo "# Cached: ".substr($d['link'],0, 100)."\n";
				$this->db->setLinkId($_id, $this->feedid);
				usleep(700000);
			} else {
				if($this->debugging) echo "# Not cached: ".substr($d['link'],0, 100)."\n";

				if(empty($link) || empty($title) || empty($image) || in_array($d['link'], $this->links) || in_array($title, $this->titles) ){
					if(in_array($d['link'], $this->links)){
						if($this->debugging) echo "Link already included in feed: ".substr($link,0, 100)."\n";
					}elseif(in_array($title, $this->titles)){
						if($this->debugging) echo "Title already included in feed: ".substr($link,0, 100)."\n";
					} else {
						if($this->debugging) echo "ERROR, missing item: link=$link , title=$title ,image=$image: ".$this->cat.":".$link."\n";
					}

					return false;
				}		

				foreach($this->titles as $match){
					if(similar_text($title, $match) >= $this->similarity){
						if($this->debugging) echo "Title to similar: ".substr($link,0, 100)."\n";
						return false;
					}
				}

				if(!empty($tags['news_keywords'])){
					$keywords=$tags['news_keywords'];
				} else if(!empty($tags['sailthru.tags'])){
					$keywords=$tags['sailthru.tags'];
				} else if(!empty($tags['keywords'])){
					$keywords=$tags['keywords'];
				} else $keywords=$tags['generated_keywords'];


				array_push($this->links, $d['link']);
				array_push($this->titles, $title);

				$this->author($d, $tags);

				$item=array(
					'feedid'=> $this->feedid,
					'title'=> $title,
					'category'=> isset($d['category']) ? $d['category'] : 'default',
					'pubDate'=> isset($d['pubDate']) ? strtotime($d['pubDate']) : time(),
					'link'=> $link,
					'url'=>$d['link'],
					'tags'=> $keywords,
					'author'=> $this->author,
					'authorLink'=> $this->authorLink,
					'facebook'=> $this->facebook($link),
					'image'=> $image,
					'description'=> strip_tags($description)
				);

				$url_id=$this->db->linkCache($d['link'], $item);
				$this->db->addSlug($url_id, $this->url_slug($title).".html");

				usleep(900000);
			}
		}
	}

	private function author($d, $tags){
		if(isset($tags['twitter:creator']) && !empty($tags['twitter:creator'])){
			$this->author=$tags['twitter:creator'];
			$this->authorLink='https://twitter.com/'.$tags['twitter:creator'];
		} else if(isset($tags['twitter:site']) && !empty($tags['twitter:site'])){
			$this->author=$tags['twitter:site'];
			$this->authorLink='https://twitter.com/'.$tags['twitter:site'];
		} else {
			$linkinfo=parse_url($d['link']);
			$this->author=str_replace('www.', '', $linkinfo['host']);
			$this->authorLink=$linkinfo['scheme'].'://'.$linkinfo['host'];
		}
	}

	private function description($d, $tags){
		$description=false;
		if(!empty($tags['twitter:description'])){
			$description=$tags['twitter:description'];
		} elseif(!empty($tags['og:description'])){
			$description=$tags['og:description'];
		} elseif(!empty($d['description']) && is_string($d['description'])) $description=$d['description'];
		return $description;
	}

 	private function image($d, $tags, $description){
		$image=false; 
		if(!empty($tags['twitter:image'])){
			$image=$tags['twitter:image'];
		} elseif(!empty($tags['twitter:image:src'])){
			$image=$tags['twitter:image:src'];
		} elseif(!empty($tags['og:image'])){
			$image=$tags['og:image'];
		} elseif(!empty($tags['image_src'])){
			$image=$tags['image_src'];
		} elseif(!empty($d['image'])){
			$image=$d['image'];
		} elseif(preg_match('/<img[^>]+>/i', $description, $img) && preg_match( '@src="([^"]+)"@' , $img[0], $match)){
			$image=rtrim(ltrim($match[0], 'src="'), '"');
		} 
		if(empty($image)){
			$image='blank.png';
		}else{
			$image=$this->fetchImage($image);
		}
			
		return $image;
	}

	private function fetchImage($image){
			try{
				$info=getimagesize($image);
				list($width, $height) = $info;

				$ratio_orig = $width/$height;

				if($width > 480){
					$new_width=480;
					$new_height = 480/$ratio_orig;
					if($width > 2000){
						$quality=70;
					} else $quality=80;
					
				} else {
					$new_width=$width;
					$new_height = 480*$ratio_orig;
					$quality=100;
				}

					$image_p = imagecreatetruecolor($new_width, $new_height);

					switch($info['mime']){
						case 'image/jpeg':
							$img = imagecreatefromjpeg($image);
						break;
						case 'image/png':
							$img = imagecreatefrompng($image);
						break;
						case 'image/gif':
							$img = imagecreatefromgif($image);
						break;
					}

					if(!isset($img)){
						return 'blank.png';
					} else {
						imagecopyresampled($image_p, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

						$image_name='images/'.md5($image.time()).'.jpg';
						imagejpeg($image_p, $image_name, $quality);

						imagedestroy($image_p);

						return $image_name;
					} 


			} catch (Exception $e) {

				return 'blank.png';
			}
	}


	private function tags($url){

		$sites_html = file_get_contents($url);
		$a=array();

		$keywords=$this->getKeywords(strip_tags($sites_html));
		$a['generated_keywords']=implode(',',array_keys($keywords));

		$html = new DOMDocument();
		if(!$sites_html) return false;
		$html->loadHTML($sites_html);
		foreach($html->getElementsByTagName('meta') as $meta) {
			$p=$meta->getAttribute('property');
			if(!empty($p)) $a[$p]=$meta->getAttribute('content');

			$p=$meta->getAttribute('name');
			if(!empty($p)) $a[$p]=$meta->getAttribute('content');
		}

		foreach($html->getElementsByTagName('link') as $meta) {
			$p=$meta->getAttribute('rel');
			if($p == "image_src") $a[$p]=$meta->getAttribute('href');
		}

		$htmltitle=$html->getElementsByTagName('title')->item(0)->textContent;
		if(empty($a['title']) && !empty($htmltitle)) $a['title']=$htmltitle;


		return array_change_key_case($a, CASE_LOWER);
	}

	private function title($d, $tags){
		if(!empty($tags['og:title']) && is_string($tags['og:title'])){
			$title=$tags['og:title'];
		}elseif(!empty($tags['twitter:title']) && is_string($tags['twitter:title'])){
			$title=$tags['twitter:title'];
		} else if(!empty($d['title']) && is_string($d['title'])){
			$title=$d['title'];
		} else $title='';
		
		return $title;
	}

	private function url($d, $tags){
		if(!empty($tags['og:url']) && is_string($tags['og:url'])){
			$link=$tags['og:url'];
		}elseif(!empty($tags['twitter:url']) && is_string($tags['twitter:url'])){
			$link=$tags['twitter:url'];
		} else if(!empty($d['link']) && is_string($d['link'])){
			$link=$d['link'];
		} else $link='';
		
		return $link;
	}


	public function cleanup(){
		$images=$this->db->getImages();
		foreach($images as $i => $d){
			
			if(substr($d['image'],0,7) == 'images/' && is_file($d['image'])){
				echo "Removing ".$d['image']."\n";
				unlink($d['image']);
			}
		}

		$this->db->deleteImages();
	}



	private function facebook($link){
		$token="&access_token=|";
		$content = file_get_contents("https://graph.facebook.com/fql?&format=json$token&q=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url=%27$link%27");
		return json_decode($content, true);
	}

	// http://iamseanmurphy.com/creating-seo-friendly-urls-in-php-with-url-slug/
	private function url_slug($str, $options = array()) {
		// Make sure string is in UTF-8 and strip invalid UTF-8 characters
		$str = mb_convert_encoding((string)$str, 'UTF-8', mb_list_encodings());
		
		$defaults = array(
			'delimiter' => '-',
			'limit' => null,
			'lowercase' => true,
			'replacements' => array(),
			'transliterate' => false,
		);
		
		// Merge options
		$options = array_merge($defaults, $options);
		
		$char_map = array(
			// Latin
			'À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'A', 'Å' => 'A', 'Æ' => 'AE', 'Ç' => 'C', 
			'È' => 'E', 'É' => 'E', 'Ê' => 'E', 'Ë' => 'E', 'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ï' => 'I', 
			'Ð' => 'D', 'Ñ' => 'N', 'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O', 'Õ' => 'O', 'Ö' => 'O', 'Ő' => 'O', 
			'Ø' => 'O', 'Ù' => 'U', 'Ú' => 'U', 'Û' => 'U', 'Ü' => 'U', 'Ű' => 'U', 'Ý' => 'Y', 'Þ' => 'TH', 
			'ß' => 'ss', 
			'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a', 'ä' => 'a', 'å' => 'a', 'æ' => 'ae', 'ç' => 'c', 
			'è' => 'e', 'é' => 'e', 'ê' => 'e', 'ë' => 'e', 'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i', 
			'ð' => 'd', 'ñ' => 'n', 'ò' => 'o', 'ó' => 'o', 'ô' => 'o', 'õ' => 'o', 'ö' => 'o', 'ő' => 'o', 
			'ø' => 'o', 'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ü' => 'u', 'ű' => 'u', 'ý' => 'y', 'þ' => 'th', 
			'ÿ' => 'y',
	 
			// Latin symbols
			'©' => '(c)',
	 
			// Greek
			'Α' => 'A', 'Β' => 'B', 'Γ' => 'G', 'Δ' => 'D', 'Ε' => 'E', 'Ζ' => 'Z', 'Η' => 'H', 'Θ' => '8',
			'Ι' => 'I', 'Κ' => 'K', 'Λ' => 'L', 'Μ' => 'M', 'Ν' => 'N', 'Ξ' => '3', 'Ο' => 'O', 'Π' => 'P',
			'Ρ' => 'R', 'Σ' => 'S', 'Τ' => 'T', 'Υ' => 'Y', 'Φ' => 'F', 'Χ' => 'X', 'Ψ' => 'PS', 'Ω' => 'W',
			'Ά' => 'A', 'Έ' => 'E', 'Ί' => 'I', 'Ό' => 'O', 'Ύ' => 'Y', 'Ή' => 'H', 'Ώ' => 'W', 'Ϊ' => 'I',
			'Ϋ' => 'Y',
			'α' => 'a', 'β' => 'b', 'γ' => 'g', 'δ' => 'd', 'ε' => 'e', 'ζ' => 'z', 'η' => 'h', 'θ' => '8',
			'ι' => 'i', 'κ' => 'k', 'λ' => 'l', 'μ' => 'm', 'ν' => 'n', 'ξ' => '3', 'ο' => 'o', 'π' => 'p',
			'ρ' => 'r', 'σ' => 's', 'τ' => 't', 'υ' => 'y', 'φ' => 'f', 'χ' => 'x', 'ψ' => 'ps', 'ω' => 'w',
			'ά' => 'a', 'έ' => 'e', 'ί' => 'i', 'ό' => 'o', 'ύ' => 'y', 'ή' => 'h', 'ώ' => 'w', 'ς' => 's',
			'ϊ' => 'i', 'ΰ' => 'y', 'ϋ' => 'y', 'ΐ' => 'i',
	 
			// Turkish
			'Ş' => 'S', 'İ' => 'I', 'Ç' => 'C', 'Ü' => 'U', 'Ö' => 'O', 'Ğ' => 'G',
			'ş' => 's', 'ı' => 'i', 'ç' => 'c', 'ü' => 'u', 'ö' => 'o', 'ğ' => 'g', 
	 
			// Russian
			'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Д' => 'D', 'Е' => 'E', 'Ё' => 'Yo', 'Ж' => 'Zh',
			'З' => 'Z', 'И' => 'I', 'Й' => 'J', 'К' => 'K', 'Л' => 'L', 'М' => 'M', 'Н' => 'N', 'О' => 'O',
			'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T', 'У' => 'U', 'Ф' => 'F', 'Х' => 'H', 'Ц' => 'C',
			'Ч' => 'Ch', 'Ш' => 'Sh', 'Щ' => 'Sh', 'Ъ' => '', 'Ы' => 'Y', 'Ь' => '', 'Э' => 'E', 'Ю' => 'Yu',
			'Я' => 'Ya',
			'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'yo', 'ж' => 'zh',
			'з' => 'z', 'и' => 'i', 'й' => 'j', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n', 'о' => 'o',
			'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'c',
			'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sh', 'ъ' => '', 'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu',
			'я' => 'ya',
	 
			// Ukrainian
			'Є' => 'Ye', 'І' => 'I', 'Ї' => 'Yi', 'Ґ' => 'G',
			'є' => 'ye', 'і' => 'i', 'ї' => 'yi', 'ґ' => 'g',
	 
			// Czech
			'Č' => 'C', 'Ď' => 'D', 'Ě' => 'E', 'Ň' => 'N', 'Ř' => 'R', 'Š' => 'S', 'Ť' => 'T', 'Ů' => 'U', 
			'Ž' => 'Z', 
			'č' => 'c', 'ď' => 'd', 'ě' => 'e', 'ň' => 'n', 'ř' => 'r', 'š' => 's', 'ť' => 't', 'ů' => 'u',
			'ž' => 'z', 
	 
			// Polish
			'Ą' => 'A', 'Ć' => 'C', 'Ę' => 'e', 'Ł' => 'L', 'Ń' => 'N', 'Ó' => 'o', 'Ś' => 'S', 'Ź' => 'Z', 
			'Ż' => 'Z', 
			'ą' => 'a', 'ć' => 'c', 'ę' => 'e', 'ł' => 'l', 'ń' => 'n', 'ó' => 'o', 'ś' => 's', 'ź' => 'z',
			'ż' => 'z',
	 
			// Latvian
			'Ā' => 'A', 'Č' => 'C', 'Ē' => 'E', 'Ģ' => 'G', 'Ī' => 'i', 'Ķ' => 'k', 'Ļ' => 'L', 'Ņ' => 'N', 
			'Š' => 'S', 'Ū' => 'u', 'Ž' => 'Z',
			'ā' => 'a', 'č' => 'c', 'ē' => 'e', 'ģ' => 'g', 'ī' => 'i', 'ķ' => 'k', 'ļ' => 'l', 'ņ' => 'n',
			'š' => 's', 'ū' => 'u', 'ž' => 'z'
		);
		
		// Make custom replacements
		$str = preg_replace(array_keys($options['replacements']), $options['replacements'], $str);
		
		// Transliterate characters to ASCII
		if ($options['transliterate']) {
			$str = str_replace(array_keys($char_map), $char_map, $str);
		}
		
		// Replace non-alphanumeric characters with our delimiter
		$str = preg_replace('/[^\p{L}\p{Nd}]+/u', $options['delimiter'], $str);
		
		// Remove duplicate delimiters
		$str = preg_replace('/(' . preg_quote($options['delimiter'], '/') . '){2,}/', '$1', $str);
		
		// Truncate slug to max. characters
		$str = mb_substr($str, 0, ($options['limit'] ? $options['limit'] : mb_strlen($str, 'UTF-8')), 'UTF-8');
		
		// Remove delimiter from ends
		$str = trim($str, $options['delimiter']);
		
		return $options['lowercase'] ? mb_strtolower($str, 'UTF-8') : $str;
	}
}

$Aggregator=new Aggregator();

if(isset($argv[1])){
	if($argv[1] == "clients"){
		$Aggregator->client();
	}elseif($argv[1] == "cleanup"){
		$Aggregator->cleanup();
		echo "finished cleanup";
	} else {
		$Aggregator->setCats(array($argv[1]));
		$Aggregator->all();
	}
}  



