<?php

define('MAX_THREADS', 100);
// 1800
define('UPDATE_INTERVAL', 1800);
define('LIMIT_REACHED_RESCAN', 300);
error_reporting(0);

require_once('feed.php');
error_reporting(0);

function getFreeFeed(){

	$dbh = new PDO('mysql:host=127.0.0.1;dbname=news;charset=utf8', 'root', 'tical');
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$sth = $dbh->prepare("SELECT @id := id as 'id', url FROM `cat_feeds` where `lock`=0 AND updated < :updated order by RAND() LIMIT 1; update cat_feeds set `lock`=1 where id=@id");
	$sth->execute(array(':updated'=> time()- UPDATE_INTERVAL));
	$res=$sth->fetchAll(PDO::FETCH_ASSOC);
	$res0=array();
	$res0[$res[0]['id']]=$res[0]['url'];
	return $res0;
}

function unlockFeed($id){
	$dbh = new PDO('mysql:host=127.0.0.1;dbname=news;charset=utf8', 'root', 'tical');
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$sth = $dbh->prepare("UPDATE `cat_feeds` SET `lock`=0 WHERE id=:id LIMIT 1");
	return $sth->execute(array(':id'=>$id));
}

for ($ii = 1; $ii <= MAX_THREADS; ++$ii) fork();

function fork(){

	if(function_exists('pcntl_fork')){
		$pid = pcntl_fork();

		switch($pid) {
			case -1:
				exit;
			case 0:
				$info=getFreeFeed();
				if(!key($info)){
					print "\n\n#################### OUT OF RECORDS ####################\n\n";
					sleep(rand(15, LIMIT_REACHED_RESCAN));
					fork();

				} else {
					print "\n\n#################### SCANNING " .key($info)." - ####################\n\n";
					$Aggregator=new Aggregator();
					$Aggregator->run($info);
					fork();
				}
				exit;
			break;
		}	
	} else {
		$info=getFreeFeed();
		$Aggregator=new Aggregator();
		$Aggregator->run($info);
	}
}