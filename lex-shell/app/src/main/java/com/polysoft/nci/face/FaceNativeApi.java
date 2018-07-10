package com.polysoft.nci.face;

import android.app.Activity;
import android.webkit.JavascriptInterface;

import com.google.gson.Gson;
import com.polysoft.nci.interf.Callback;
import com.polysoft.nci.interf.IJavaScript;

/**
 * Created by Thinkpad on 2018/7/8.
 */

public class FaceNativeApi {
    private Activity iActivity;
    private IJavaScript<FaceResultData> iScript;
    public FaceNativeApi(Activity iActivity, IJavaScript<FaceResultData> iScript) {
        this.iActivity = iActivity;
        this.iScript = iScript;
    }

    @JavascriptInterface
    public void callLivenessRecognizeJson(String json, final String flag) {
        Callback<FaceResultData> callback = new Callback<FaceResultData>() {
            @Override
            public void onResult(FaceResultData result) {
                iScript.callJavaScript(flag, result);
            }
        };
        FaceApiMgr.callLivenessRecognize(this.iActivity, new Gson().fromJson(json, FaceInputData.class), callback);
    }

    @JavascriptInterface
    public void callLivenessRecognize(String name, String idNo, String agentCode, final String flag) {
        Callback<FaceResultData> callback = new Callback<FaceResultData>() {
            @Override
            public void onResult(FaceResultData result) {
                iScript.callJavaScript(flag, result);
            }
        };
        FaceApiMgr.callLivenessRecognize(this.iActivity, name, idNo, agentCode, callback);
    }

    @JavascriptInterface
    public void callLivenessRecognizeToken(String token, String agentCode, final String flag) {
        iScript.callJavaScript(flag, new FaceResultData("-10001", "该功能暂不可用"));
    }

}
