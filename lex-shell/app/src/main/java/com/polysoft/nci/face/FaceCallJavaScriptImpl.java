package com.polysoft.nci.face;

import android.webkit.WebView;

import com.google.gson.Gson;
import com.polysoft.nci.interf.IJavaScript;

/**
 * Created by Thinkpad on 2018/7/8.
 */

public class FaceCallJavaScriptImpl implements IJavaScript<FaceResultData> {
    private final WebView wv;
    public FaceCallJavaScriptImpl(WebView wv) {
        this.wv = wv;
    }
    @Override
    public void callJavaScript(final String flag, FaceResultData data) {
        final String json = new Gson().toJson(data);
        this.wv.post(new Runnable() {
            @Override
            public void run() {
                String call = "javascript:callFaceBack('" + flag+ "', '" + json + "')";
                wv.loadUrl(call, null);
            }
        });
    }
}
