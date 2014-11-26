<?php

class Pages extends FeedMonster{
	var $cats=array();
	var $page=array();


	public function process(){
		if($this->myid()) {
			$this->cats=$this->getUserCatsProcess();
		}
	}

	public function getCatFeeds($slug){
		return $this->getFeedList($slug);
	}


	public function page(){
		$val=$this->getSlug($_REQUEST['p']);
		if(!isset($val['url'])){
			header('HTTP/1.0 404 Not Found');
			die();
		} else $this->page=$val;
	}

	public function checkBeta(){
		return $this->totalUsers() < BETA_USER_LIMIT;
	}

	public function addFeed(){
		require_once('classes/ajax.php');

		$Ajax=new Ajax();
		$Ajax->db=$this;

		$feed=$Ajax->addFeed($_REQUEST['u']);

		define('FEED_ADDED', true);
	}

}