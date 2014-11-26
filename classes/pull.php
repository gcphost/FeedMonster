<?php
class Pull extends FeedMonster{
	var $cat, $db;

	public function __construct(){
		parent::__construct();
		$this->cat=!empty($_REQUEST['c']) ? $_REQUEST['c'] : (isset($_COOKIE['uuid']) ? $_COOKIE['uuid'] : 'topstories');
		if(isset($_REQUEST['reset'])) unset($_SESSION['cache'][$this->cat]['highest'], $_SESSION['displayed'][$this->cat]);
	}

	public function process(){
		return $this->pull(
			$this->cat,
			isset($_REQUEST['start']) ? $_REQUEST['start'] : 0,
			isset($_REQUEST['limit']) ? $_REQUEST['limit'] : 10,
			isset($_REQUEST['sort']) ? $_REQUEST['sort'] : 'likes',
			isset($_REQUEST['search']) ? $_REQUEST['search'] : '',
			isset($_REQUEST['source']) ? $_REQUEST['source'] : '',
			isset($_REQUEST['pictures']) ? true : false
		);
	}
}