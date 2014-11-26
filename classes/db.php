<?php
class Database{
	var $dbh;
	// only pull links a day old
	var $pull_cache=86400;
	// delete links after 3 days
	var $delete_cache=604800;

	public function __construct(){
		//		echo $this->auth() ? 'yes' : 'no';

$this->connect();
define('UUID', $this->checkUUID());

	}

	public function connect(){
		$this->dbh = new PDO('mysql:host=127.0.0.1;dbname=news;charset=utf8', '', '');
		$this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		mb_internal_encoding("UTF-8");


	}

	public function unlock($id){
		$sth = $this->dbh->prepare("UPDATE `cat_feeds` SET `lock`=0 WHERE id=:id LIMIT 1");
		return $sth->execute(array(':id'=>$id));
	}


	public function getTime($cat){
		$sth = $this->dbh->prepare("SELECT `updated` FROM `cats` WHERE name=:cat");
		$sth->execute(array(
				':cat'=>$cat
		));
		return $sth->fetchAll(PDO::FETCH_ASSOC);

	}


	public function saveUser($uuid){
		$sth = $this->dbh->prepare("INSERT INTO `users` (uuid) VALUES (:uuid)");
		$sth->execute(array(
				':uuid'=>$uuid
		));
	}

	public function deleteUser(){
		$sth = $this->dbh->prepare("DELETE FROM `users` WHERE uuid=:uuid");
		return $sth->execute(array(
				':uuid'=>$this->myid()
		));
	}

	public function getUser($uuid){
		$sth = $this->dbh->prepare("SELECT * FROM `users` WHERE uuid=:uuid LIMIT 1");
		$sth->execute(array(
				':uuid'=>$uuid
		));
		$results=$sth->fetchAll(PDO::FETCH_ASSOC);
		return isset($results[0]) ? $results[0] : false;
	}

	public function getUid($uuid){
		$sth = $this->dbh->prepare("SELECT * FROM `users` WHERE uuid=:uuid");
		$sth->execute(array(
				':uuid'=>$uuid
		));
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}

	public function deleteUserFeed($feed_id){
		$sth = $this->dbh->prepare("DELETE FROM `user_feeds` WHERE user_id=:uid AND feed_id=:feed_id");
		return $sth->execute(array(
				':uid'=>$this->myid(),
				':feed_id'=>$feed_id
		));
	}

	public function deleteUserCat($name){
		$sth = $this->dbh->prepare("DELETE FROM `user_cats` WHERE user_id=:uid AND cat_id=:cat_id");
		return $sth->execute(array(
				':uid'=>$this->myid(),
				':cat_id'=>$this->getCatsIdLookup($name)
		));
	}

	private function getCatsIdLookup($name){
		$sth = $this->dbh->prepare("Select
  cats.id
From
  user_cats Inner Join
  cats On user_cats.cat_id = cats.id
Where
  cats.name = :name And
  user_cats.user_id = :user_id");
		$sth->execute(array(
				':name'=>trim($name),
				':user_id'=>$this->myid()
		));
		$results=$sth->fetch();
	
		return isset($results['id']) ? $results['id'] : false;


	}

	public function deleteUserCatFeed($name, $feed_id){
		$sth = $this->dbh->prepare("DELETE FROM `user_cat_feeds` WHERE user_cats_id=:user_cats_id AND feed_id=:feed_id");
		return $sth->execute(array(
				':user_cats_id'=>$this->getCatsIdLookup($name),
				':feed_id'=>$feed_id
		));
	}


	public function saveUserFeed($url, $title){
		$feed_id=$this->addCatFeed($url, $title);
		$sth = $this->dbh->prepare("INSERT IGNORE INTO `user_feeds` (user_id, feed_id) VALUES (:uid, :feed_id)");
		$sth->execute(array(
				':uid'=>$this->myid(),
				':feed_id'=>$feed_id
		));

		return $feed_id;
	}

	public function getUsers(){
		$sth = $this->dbh->prepare("SELECT * FROM `users`");
		$sth->execute();
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}

	public function searchSources($search){
		$sth = $this->dbh->prepare("Select
	Distinct
  cat_lookup.cat_id,
  cat_feeds.url,
  cat_feeds.title,
  url_cache_feeds.feed_id
From
  cat_slugs Inner Join
  cat_lookup On cat_slugs.cat_id = cat_lookup.cat_id Inner Join
  cat_feeds On cat_lookup.feed_id = cat_feeds.id Inner Join
  url_cache_feeds On url_cache_feeds.feed_id = cat_feeds.id Inner Join
  url_cache On url_cache_feeds.url_id = url_cache.id
Where
	(MATCH (url_cache.title, url_cache.description) AGAINST (:regsearch) OR
	MATCH (cat_feeds.url,cat_feeds.title) AGAINST (:regsearch) OR
	MATCH (url_cache.author) AGAINST (:regsearch) OR
	MATCH (url_cache.tags) AGAINST (:regsearch) OR
	MATCH (cat_slugs.slug) AGAINST (:regsearch) )
 AND cat_lookup.cat_id 
 NOT IN 
 (
	 Select
	  DISTINCT cat_lookup.cat_id
	From
	  user_feeds Inner Join
	  cat_feeds On user_feeds.feed_id = cat_feeds.id Inner Join
	  cat_lookup On cat_lookup.feed_id = cat_feeds.id
	Where
	  user_feeds.user_id = :user_id And
	  cat_lookup.feed_id = url_cache_feeds.feed_id
 )
  LIMIT 100");



		$sth->execute(array(
				':user_id'=>$this->myid(),
				':regsearch'=>$search
		));
		
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}

	public function getUserCats(){
		$sth = $this->dbh->prepare("Select
  cats.id,
  cats.name,
  cats.icon,
  cat_slugs.slug
From
  user_cats Inner Join
  cats On user_cats.cat_id = cats.id Inner Join
  cat_slugs On cat_slugs.cat_id = cats.id
Where
  user_cats.user_id = :uuid");
		$sth->execute(array(
				':uuid'=>$this->myid()
		));
		
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}

	public function getUserCatsProcess(){
		$results=array();
		foreach($this->getUserCats($this->myid()) as $id => $feeds) $results[$id]=$feeds;
		return $results;
	}

//to-do, need to rendeer both in cat feed and not, for the user, to determin if they should add/remove that cat, union both querys once they work...
	public function getFeedList($slug){
		
		$sth = $this->dbh->prepare("(Select Distinct
  cat_feeds.id,
  cat_feeds.url,
  cat_feeds.title,
  'added'
From
  user_feeds Inner Join
  cat_feeds On user_feeds.feed_id = cat_feeds.id
Where
  cat_feeds.id In (Select
    user_cat_feeds.feed_id
  From
    user_cat_feeds Inner Join
    cat_slugs On cat_slugs.cat_id = user_cat_feeds.user_cats_id
  Where
    user_cat_feeds.feed_id = user_feeds.feed_id And
    cat_slugs.slug = :slug) And
  user_feeds.user_id = :user_id)
  
  union
  
  (Select Distinct
  cat_feeds.id,
  cat_feeds.url,
  cat_feeds.title,
  'notadded'
From
  user_feeds Inner Join
  cat_feeds On user_feeds.feed_id = cat_feeds.id
Where
  cat_feeds.id not In (Select
    user_cat_feeds.feed_id
  From
    user_cat_feeds Inner Join
    cat_slugs On cat_slugs.cat_id = user_cat_feeds.user_cats_id
  Where
    user_cat_feeds.feed_id = user_feeds.feed_id And
    cat_slugs.slug = :slug) And
  user_feeds.user_id = :user_id) LIMIT 500");
		$sth->execute(array(
				':user_id'=>$this->myid(),
				':slug'=>$this->slug($slug)
		));
		
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}

	
	public function getUserFeedsByID($user_id=false){
		$sth = $this->dbh->prepare("SELECT * FROM user_feeds Inner Join cat_feeds On user_feeds.feed_id = cat_feeds.id WHERE user_feeds.user_id = :user_id");
		$sth->execute(array(
				':user_id'=> $user_id 
		));
		
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}
		
	public function getUserFeeds(){
		$sth = $this->dbh->prepare("SELECT * FROM user_feeds Inner Join cat_feeds On user_feeds.feed_id = cat_feeds.id WHERE user_feeds.user_id = :user_id");
		$sth->execute(array(
				':user_id'=>$this->myid()
		));
		
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}

	
	public function getUserFeedsProcess($user_id){
		$results=array();
		foreach($this->getUserFeedsByID($user_id) as $feeds) $results[$feeds['id']]=$feeds['url'];
		return $results;
	}


	public function totalUsers(){
		$sth = $this->dbh->prepare("SELECT count(*) FROM `users` ");
		$sth->execute();
		$results=$sth->fetch();
		return isset($results[0]) ? $results[0] : false;
	}


	public function linkIsCached($url, $title){
		$sth = $this->dbh->prepare("SELECT id FROM `url_cache` WHERE url=:url OR title=:title LIMIT 1");
		$sth->execute(array(
				':url'=>$url,
				':title'=>$title
		));
		$results=$sth->fetch();
		return isset($results[0]) ? $results[0] : false;
	}

	public function getSlug($url){
		$sth = $this->dbh->prepare("Select
  url_cache.*
From
  url_cache Inner Join
  url_cache_slugs On url_cache_slugs.url_id = url_cache.id
Where
  url_cache_slugs.slug = :slug  LIMIT 1");
		$sth->execute(array(
				':slug'=>$url
		));
		$results=$sth->fetch();
		return $results ? : false;
	}


	public function linkCache($url, $d ){

		$facebook=isset($d['facebook']['data'][0]) ? $d['facebook']['data'][0] : false;
		$sth = $this->dbh->prepare("INSERT INTO `url_cache` (url, `likes`,`comments`,`shares`,`title`,`pubDate`,link,tags,author,authorLink,image,description, updated) VALUES (:url, :likes, :comments, :shares, :title, :pubDate, :link, :tags, :author, :authorLink, :image, :description, :updated)");
		$sth->execute(array(
				':url'=>$d['url'],
				':likes'=>isset($facebook['like_count']) ? $facebook['like_count'] : 0,
				':comments'=>isset($facebook['comment_count']) ? $facebook['comment_count'] : 0,
				':shares'=>isset($facebook['share_count']) ? $facebook['share_count'] : 0,
				':title'=>$d['title'],
				':pubDate'=>$d['pubDate'],
				':link'=>$d['link'],
				':tags'=>is_array($d['tags']) ? implode(',',$d['tags']) : $d['tags'],
				':author'=>$d['author'],
				':authorLink'=>$d['authorLink'],
				':image'=>$d['image'],
				':description'=>$d['description'],
				':updated'=>time()
		));
		$id=$this->dbh->lastInsertId();
		$this->setLinkId($id, $d['feedid']);
		return $id;


	}

	public function unlockFeed($feed_id){
		$sth = $this->dbh->prepare("UPDATE `cat_feeds` SET `lock`=0 WHERE id=:id LIMIT 1");
		return $sth->execute(array(':id'=>$feed_id));

	}


	public function setLinkId($id, $id2){
			$sth = $this->dbh->prepare("INSERT IGNORE INTO `url_cache_feeds` (url_id, feed_id) VALUES (:url, :feed)");
			$sth->execute(array(
					':url'=> $id,
					':feed'=>$id2
			));
	}

//todo goes from setUserUpdated to setfeedupdate, chant $cat to url_feeds id
	public function setFeedUpdated($feed_id){
		$sth = $this->dbh->prepare("UPDATE `cat_feeds` SET updated=:updated WHERE id=:feed_id");
		return $sth->execute(array(
				':updated'=>time(),
				':feed_id'=>$feed_id
		));
	}

	public function setCatUpdated($cat){
		$sth = $this->dbh->prepare("UPDATE `cats` SET updated=:updated WHERE name=:cat");
		return $sth->execute(array(
				':updated'=>time(),
				':cat'=>$cat
		));
	}

	public function getCat($cat){
		$sth = $this->dbh->prepare("SELECT * FROM `cats` WHERE name=:cat LIMIT 1");
		$sth->execute(array(
				':cat'=>$cat
		));
		return $sth->fetch(PDO::FETCH_ASSOC);
	}

	public function getFeeds($cat){
		$results=array();
		$sth = $this->dbh->prepare("
Select
  cat_feeds.id,
  cat_feeds.url
From
  cat_feeds Inner Join
  cat_lookup On cat_lookup.feed_id = cat_feeds.id Inner Join
  cats On cat_lookup.cat_id = cats.id
Where
  cats.name = :cat
		");
		$sth->execute(array(
				':cat'=>$cat
		));
		$feeds=$sth->fetchAll(PDO::FETCH_ASSOC);
		foreach($feeds as $f){
			$results[$f['id']]=$f['url'];
		}
		return $results;
	}

	public function addSlug($url_id, $slug){
		$sth = $this->dbh->prepare("INSERT INTO `url_cache_slugs` SET  url_id=:url_id, slug=:slug");
		return $sth->execute(array(
				':url_id'=>$url_id,
				':slug'=>$slug
		));
	}


	public function addUserCat($name, $icon){
		$slug=$this->slug($name);

		$sth = $this->dbh->prepare("SELECT id FROM `cats` WHERE name=:name LIMIT 1");
		$sth->execute(array(
				':name'=>$name
		));
		$results=$sth->fetch(PDO::FETCH_ASSOC);

		if(isset($results[0])){
			$id= $results[0];
		} else {

			$sth = $this->dbh->prepare("INSERT INTO `cats` SET  name=:name, icon=:icon, updated=:updated");
			$sth->execute(array(
					':name'=>$name,
					':icon'=>$icon,
					':updated'=>time()-3600
			));
			$id= $this->dbh->lastInsertId();

			$sth = $this->dbh->prepare("INSERT INTO `cat_slugs` SET  cat_id=:cat_id, slug=:slug");
			$sth->execute(array(
					':cat_id'=>$id,
					':slug'=>$slug
			));

		}

		$sth = $this->dbh->prepare("INSERT IGNORE INTO  `user_cats` SET  user_id=:user_id, cat_id=:cat_id");
		$sth->execute(array(
				':user_id'=>$this->myid(),
				':cat_id'=>$id
		));

		return $slug;
	}


	public function addUserFeed($feed_id, $name){
		$sth = $this->dbh->prepare("INSERT IGNORE INTO `user_cat_feeds` SET  user_cats_id=:user_cats_id, feed_id=:feed_id");
		return $sth->execute(array(
				':user_cats_id'=>$this->getCatsIdLookup($name),
				':feed_id'=>$feed_id
		));
	}

	public function passwordMonster($password){
		$sth = $this->dbh->prepare("UPDATE `users` SET  `password`=:password WHERE `id`=:user_id");
		return $sth->execute(array(
				':user_id'=>$this->myid(),
				':password'=>crypt($password, $this->salt())
		));
	}


	public function addCatFeed($url, $title){

		$sth = $this->dbh->prepare("SELECT id FROM `cat_feeds` WHERE url=:url LIMIT 1");
		$sth->execute(array(
				':url'=>$url
		));
		$results=$sth->fetch();

		if(isset($results['id'])){
			return $results['id'];
		} else {

			$sth = $this->dbh->prepare("INSERT INTO `cat_feeds` SET  url=:url, title=:title, updated=:updated");
			$sth->execute(array(
					':url'=>$url,
					':title'=>$title,
					':updated'=>time()-3600
			));
			return $this->dbh->lastInsertId();
		}
	}


	public function markRead($url_id){
		$sth = $this->dbh->prepare("INSERT IGNORE INTO `user_hates` SET  url_id=:url_id, user_id=:user_id");
		return $sth->execute(array(
				':url_id'=>$url_id,
				':user_id'=>$this->myid()
		));
	}

	public function addFavorite($url_id){

		$sth = $this->dbh->prepare("SELECT count(*) FROM `user_favs` WHERE url_id=:url_id AND user_id=:user_id");
		$sth->execute(array(
				':url_id'=>$url_id,
				':user_id'=>$this->myid()
		));
		$results=$sth->fetch();
		if(isset($results[0]) && $results[0] > 0){
			$sth = $this->dbh->prepare("DELETE FROM `user_favs` WHERE  url_id=:url_id AND user_id=:user_id");
			return $sth->execute(array(
					':url_id'=>$url_id,
					':user_id'=>$this->myid()
			));
		} else {
			$sth = $this->dbh->prepare("INSERT INTO `user_favs` SET  url_id=:url_id, user_id=:user_id");
			return $sth->execute(array(
					':url_id'=>$url_id,
					':user_id'=>$this->myid()
			));
		}
	}

	public function myid(){
		if(empty($_COOKIE['uuid'])) return false;
		if(!isset($_SESSION['cache']['user_id'])){
			if(!$uid=$this->getUid($_COOKIE['uuid'])) return false;
			$_SESSION['cache']['user_id']=$uid[0]['id'];
		}
		return $_SESSION['cache']['user_id'];
	}

	private function getOrder($order){
		 switch($order){
			case 'likes':
				$order='url_cache.likes DESC';
			break;
			case 'comments':
				$order='url_cache.comments DESC';
			break;
			case 'shares':
				$order='url_cache.shares DESC';
			break;
			case 'author':
				$order='url_cache.author DESC';
			break;
			case 'date':
				$order='url_cache.updated DESC';
			break;
			case 'source':
				$order='url_cache_feeds.feed_id DESC';
			break;
			default:
				$order='url_cache.updated DESC';
			break;
		}
		return $order;
	}

	private function isUserCategory($slug){
		$sth = $this->dbh->prepare("Select * From cat_slugs Inner Join user_cats On user_cats.cat_id = cat_slugs.cat_id Where user_cats.user_id = :user_id And cat_slugs.slug = :slug LIMIT 1");
		$sth->execute(array(
				':user_id'=>$this->myid(),
				':slug'=>$slug
		));
		$results=$sth->fetch();
		return isset($results['cat_id']);

	}

	public function pull($cat, $start='0', $limit='10', $order="likes", $search='', $source='', $pictures=true){

		$start=filter_var($start,FILTER_SANITIZE_NUMBER_INT);
		$limit=filter_var($limit,FILTER_SANITIZE_NUMBER_INT);
		$order=$this->getOrder($order);
		if(isset($_SESSION['displayed'][$cat])) {
			$inQuery='';
			$dupres=array();
			foreach($_SESSION['displayed'][$cat] as $i=> $id){
				$inQuery.=':duperes'.$id.',';
				$dupres[$id]=':duperes'.$id;
			}
			$inQuery=rtrim($inQuery, ',');
		}

		if($this->isUserCategory($cat)){
			$ij="
				  INNER JOIN url_cache_feeds On url_cache_feeds.url_id = url_cache.id 
				  INNER JOIN cat_feeds On url_cache_feeds.feed_id = cat_feeds.id 
				  INNER JOIN url_cache_slugs On url_cache_slugs.url_id = url_cache.id 
				  INNER JOIN user_cat_feeds On user_cat_feeds.feed_id = cat_feeds.id 
				  INNER JOIN user_cats On user_cat_feeds.user_cats_id = user_cats.cat_id 
				  INNER JOIN cats On user_cats.cat_id = cats.id 
				  INNER JOIN cat_slugs On cat_slugs.cat_id = cats.id
			";

			
			$wh="
				user_cat_feeds.feed_id NOT IN (SELECT feed_id FROM user_hatesfeed WHERE user_id=:userid) 
				AND url_cache.id NOT IN (SELECT url_id FROM user_hates WHERE user_id=:userid)
				AND cat_slugs.slug = :cat 
				AND user_cats.user_id = :userid 

			";

			$wha=" AND url_cache.id IN (SELECT url_id FROM user_favs WHERE user_id=:userid) ";
			$whb=" AND url_cache.id NOT IN (SELECT url_id FROM user_favs WHERE user_id=:userid) ";




		} else if($cat == "yourpantry"){
			$ij="
				INNER JOIN url_cache_feeds On url_cache_feeds.url_id = url_cache.id 
				INNER JOIN cat_feeds On url_cache_feeds.feed_id = cat_feeds.id
				INNER JOIN user_feeds On user_feeds.feed_id = cat_feeds.id
				INNER JOIN url_cache_slugs On url_cache_slugs.url_id = url_cache.id
			";

			$wh="		
				user_feeds.user_id = :userid
				
			";
			$wha='';
			$whb='';

		} elseif($cat == "recent"){
			$ij="
				INNER JOIN url_cache_feeds On url_cache_feeds.url_id = url_cache.id 
				INNER JOIN cat_feeds On url_cache_feeds.feed_id = cat_feeds.id 
				INNER JOIN url_cache_slugs On url_cache_slugs.url_id = url_cache.id
				INNER JOIN user_hates On user_hates.url_id = url_cache.id

			";

			
			$wh="
				user_hates.user_id = :userid
					
			";
			$wha=" AND url_cache.id IN (SELECT url_id FROM user_favs WHERE user_id=:userid) ";
			$whb=" AND url_cache.id NOT IN (SELECT url_id FROM user_favs WHERE user_id=:userid) ";

			$order='user_hates.id DESC';
		} elseif($cat == "favorites"){
			$ij="
				INNER JOIN url_cache_feeds On url_cache_feeds.url_id = url_cache.id 
				INNER JOIN cat_feeds On url_cache_feeds.feed_id = cat_feeds.id 
				INNER JOIN url_cache_slugs On url_cache_slugs.url_id = url_cache.id

			";

			
			$wh="  url_cache.id IN (SELECT url_id FROM user_favs WHERE user_id=:userid) ";
			$wha='';
			$whb='';
		}else {
			$ij="
				INNER JOIN url_cache_feeds On url_cache_feeds.url_id = url_cache.id 
				INNER JOIN cat_feeds On url_cache_feeds.feed_id = cat_feeds.id 
				INNER JOIN cat_lookup On url_cache_feeds.feed_id = cat_lookup.feed_id 
				INNER JOIN cats On cat_lookup.cat_id = cats.id
				INNER JOIN url_cache_slugs On url_cache_slugs.url_id = url_cache.id
				INNER JOIN cat_slugs On cat_slugs.cat_id = cats.id
			";

			
			$wh="
				url_cache_feeds.feed_id NOT IN (SELECT feed_id FROM user_hatesfeed WHERE user_id=:userid) 
				AND url_cache.id NOT IN (SELECT url_id FROM user_hates WHERE user_id=:userid)
				AND cat_slugs.slug = :cat 
			";

			$wha=" AND url_cache.id IN (SELECT url_id FROM user_favs WHERE user_id=:userid) ";
			$whb=" AND url_cache.id NOT IN (SELECT url_id FROM user_favs WHERE user_id=:userid) ";

		}

		$orderby=" ORDER BY $order, url_cache.pubDate LIMIT $start, $limit";

		$favorites="SELECT DISTINCT url_cache.id as 'id', url_cache.*, 'favorite', url_cache_slugs.slug FROM url_cache $ij WHERE $wh $wha";
		$regular  ="SELECT DISTINCT url_cache.id as 'id', url_cache.*,    'false', url_cache_slugs.slug FROM url_cache $ij WHERE $wh $whb";




		if($cat == "favorites"){
			$query="$favorites";
		} else $query="($favorites";

if(isset($_SESSION['displayed'][$cat])) 	$query.=" AND url_cache.id NOT IN ($inQuery) ";

if(!empty($pictures) && $pictures != "false") $query.=" AND url_cache.image !='blank.png' ";
if(isset($_SESSION['cache'][$cat]['highest'])) $query.=" AND url_cache.id < :highest ";


if(!empty($search) && $search != "false") $query.=" AND MATCH(url_cache.title, url_cache.description) AGAINST (:search)";
if(!empty($source) && $source != "false") $query.=" AND url_cache.author=:source";
	
if($cat != "favorites") $query.=" $orderby) UNION ($regular";

if(!empty($pictures) && $pictures != "false") $query.=" AND url_cache.image !='blank.png' ";
if(isset($_SESSION['cache'][$cat]['highest'])) $query.=" AND url_cache.id < :highest ";


if(!empty($search) && $search != "false") $query.=" AND MATCH(url_cache.title, url_cache.description) AGAINST (:search)";
if(!empty($source) && $source != "false") $query.=" AND url_cache.author=:source";

if($cat == "favorites"){
	$query.=" $orderby";
} else $query.="$orderby)";

//echo "<h4>$query</h4>";
try{
		$sth = $this->dbh->prepare($query);
		$i=1;

		if(isset($_SESSION['displayed'][$cat])) {
			foreach($dupres as $i=> $d)$sth->bindValue($d, $i);
		}

		$sth->bindValue(':userid', $this->myid(), PDO::PARAM_INT); $i++;


		if($cat != "recent" && $cat != "favorites") $sth->bindValue(':cat', $cat, PDO::PARAM_STR); $i++;

		if(isset($_SESSION['cache'][$cat]['highest'])){
			$sth->bindValue(':highest', (int) $_SESSION['cache'][$cat]['highest'], PDO::PARAM_INT); $i++;
		}

		if(!empty($search) && $search != "false"){
			$sth->bindValue(':search', $search, PDO::PARAM_STR);$i++;
		}

		if(!empty($source) && $source != "false"){
			$sth->bindValue(':source',  $source, PDO::PARAM_INT);$i++;
		}

		$sth->execute();
		$feeds=$sth->fetchAll(PDO::FETCH_ASSOC);


}

  catch(exception $ex)
    {
        print_r($ex);
    }

		if(!isset($feeds)) return false;
		
		
		function sortByOrder($a, $b) {
			return $b['id'] - $a['id'];
		}

		$higest=$feeds;
		usort($higest, 'sortByOrder');
		if(isset($higest[0]['id'])) $_SESSION['cache'][$cat]['higest']=$higest[0]['id'];

		if(!isset($_SESSION['displayed'][$cat]))$_SESSION['displayed'][$cat]=array();
		foreach($feeds as $id=> $ad){
			if(!in_array($ad['id'], $_SESSION['displayed'][$cat])){
				$_SESSION['displayed'][$cat][]=$ad['id'];
			} else unset($feeds[$id]);
		}
		

		return json_encode($feeds);

	}

	public function getImages(){
		$sth = $this->dbh->prepare("SELECT image FROM `url_cache` WHERE updated < :updated");
		$sth->execute(array(
				':updated'=>time()-$this->delete_cache
		));
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}

	public function deleteImages(){
		$sth = $this->dbh->prepare("DELETE FROM `url_cache` WHERE updated < :updated");
		return $sth->execute(array(
				':updated'=>time()-$this->delete_cache
		));

	}

	public function checkUUID(){
		if(empty($_COOKIE['uuid'])) return false;
		return $this->getUser($_COOKIE['uuid']) ? $_COOKIE['uuid'] : false;
	}


// these down here should be somewhere else
	public function slug($str, $options = array()) {
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

	public function salt(){
		$cost = 10;
		$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
		return sprintf("$2a$%02d$", $cost) . $salt;
	}


}
