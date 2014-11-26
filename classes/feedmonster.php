<?php

class FeedMonster extends Database{

	public function user(){
		return parent::getUser($_COOKIE['uuid']);
	}

	public function logout(){
		unset($_SESSION);
		@session_destroy();
		@session_start();
		return true;
	}

	public function killuser(){
		setcookie('uuid', '', time()-3600, "/");
		unset($_COOKIE['uuid']);
	}

	public function authMonster($password){
		$user=$this->user();
		if(crypt($password, $user['password']) === $user['password']){
			$this->setAuthed();
			return true;
		} else return false;
	}

	public function setAuthed(){
		$_SESSION['AUTHED']=true;
		unset($_SESSION['REQUIRE_PASSWORD']);
	}

	public function checkAuthed(){
		return isset($_SESSION['AUTHED']) ? true : false;
	}

	public function isPasswordRequired(){
		if($this->checkAuthed() || !isset($_COOKIE['uuid'])) return false;

		$user=$this->user();
		if(!empty($user['password'])){
			$_SESSION['REQUIRE_PASSWORD']=true;
			return true;
		}
		return false;
	}

	public function checkRequestMode($mode){
		return !in_array($mode, $this->noauth) ?  ($this->isPasswordRequired() ? false : true) : true;
	}

	public function getHash($password){
		return crypt($password, $this->salt());
	}

	public function freeUUID(){
		do {
			$uuid= $this->generateUUID(str_replace("::", '', time().$_SERVER['REMOTE_ADDR']));
		} while (parent::getUser($uuid) != false);
		parent::saveUser($uuid);
		$this->setUserCookie($uuid);
		return $uuid;
	}

	public function setUserCookie($uuid){
		setcookie('uuid', $uuid, time() + (86400 * 30), "/");
	}

	public function importUser($uuid){
		if(parent::getUser($uuid)){
			$this->setUserCookie($uuid);
			$this->isPasswordRequired();
			header('location: '. SITE_URL);
		}

	}

	private function generateUUID($in, $to_num = false, $pad_up = false, $pass_key = null){
		$out   =   '';
		$index = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$base  = strlen($index);

		if ($pass_key !== null) {
			// Although this function's purpose is to just make the
			// ID short - and not so much secure,
			// with this patch by Simon Franz (http://blog.snaky.org/)
			// you can optionally supply a password to make it harder
			// to calculate the corresponding numeric ID

			for ($n = 0; $n < strlen($index); $n++) {
				$i[] = substr($index, $n, 1);
			}

			$pass_hash = hash('sha256',$pass_key);
			$pass_hash = (strlen($pass_hash) < strlen($index) ? hash('sha512', $pass_key) : $pass_hash);

			for ($n = 0; $n < strlen($index); $n++) {
				$p[] =  substr($pass_hash, $n, 1);
			}

			array_multisort($p, SORT_DESC, $i);
			$index = implode($i);
		}

		if ($to_num) {
			// Digital number  <<--  alphabet letter code
			$len = strlen($in) - 1;

			for ($t = $len; $t >= 0; $t--) {
				$bcp = bcpow($base, $len - $t);
				$out = $out + strpos($index, substr($in, $t, 1)) * $bcp;
			}

			if (is_numeric($pad_up)) {
				$pad_up--;

				if ($pad_up > 0) {
					$out -= pow($base, $pad_up);
				}
			}
		} else {
			// Digital number  -->>  alphabet letter code
			if (is_numeric($pad_up)) {
				$pad_up--;

				if ($pad_up > 0) {
					$in += pow($base, $pad_up);
				}
			}

			for ($t = ($in != 0 ? @floor(@log($in, $base)) : 0); $t >= 0; $t--) {
				$bcp = bcpow($base, $t);
				$a   = floor($in / $bcp) % $base;
				$out = $out . substr($index, $a, 1);
				$in  = $in - ($a * $bcp);
			}
		}

		return $out;
	}

	public function checkToken(){
		$token=isset($_REQUEST['token']) ? $_REQUEST['token'] : false;
		return $_SESSION['token'] == $token ? true : false;
	}


	public function emailTemplate($template){
		$tpl='templates/email_'.$template.'.html';
		if(is_file($tpl) && is_readable($tpl))
			return file_get_contents($tpl);
	}

	public function sendmail($to,$subject, $body){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt ($ch, CURLOPT_MAXREDIRS, 3);
		curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, false);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt ($ch, CURLOPT_VERBOSE, 0);
		curl_setopt ($ch, CURLOPT_HEADER, 1);
		curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($ch, CURLOPT_USERPWD, 'api:' . MAILGUN_API);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, true); 
		curl_setopt($ch, CURLOPT_HEADER, false); 
		curl_setopt($ch, CURLOPT_URL, MAILGUN_URL);
		curl_setopt($ch, CURLOPT_POSTFIELDS,                
				array(  'from'      => 'FeedMonster <' . 'devs@feed-monster.com' . '>',
						'to'        =>  $to,
						'h:Reply-To'=>  'William Bowman (Lead Monster) <gcphost@gmail.com>',
						'subject'   => $subject,
						'html'      => $body
			//'attachment[1]' => '@aaa.rar'
					));
		$result = curl_exec($ch);
		curl_close($ch);
		$res = json_decode($result,TRUE);
		return !empty($res['id']) ? true : false;
	}

}