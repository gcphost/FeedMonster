package com.javacodegeeks.android.androidwebviewexample;

import android.app.Activity;

import android.os.Bundle;
import android.webkit.WebView;
 
public class MainActivity extends Activity {
 	
	private WebView webView;

	public void onCreate(Bundle savedInstanceState) {

		super.onCreate(savedInstanceState);
		setContentView(R.layout.webcontent);

		webView = (WebView) findViewById(R.id.webView);

		webView.getSettings().setJavaScriptEnabled(true);
		
		webView.getSettings().setDomStorageEnabled(true);
		

		webView.loadUrl("https://feed-monster.com");

		

	}
	
	
 
}