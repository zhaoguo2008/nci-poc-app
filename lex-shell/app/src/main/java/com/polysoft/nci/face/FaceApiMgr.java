package com.polysoft.nci.face;

import android.content.Context;

import com.baidu.fsg.api.BaiduRIM;
import com.baidu.fsg.api.RimServiceCallback;
import com.baidu.fsg.base.utils.Md5Utils;
import com.polysoft.nci.interf.Callback;
import com.polysoft.nci.utils.CtxUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Thinkpad on 2018/7/8.
 */

public class FaceApiMgr {

    public static void initApi() {
        HashMap<String, Object> params = new HashMap<>();
        params.put(FaceConstant.KEY_RIMID, FaceConstant.RIMID);
        BaiduRIM.getInstance().initRIM(CtxUtil.getAppContext(), params);
    }


    public static void callLivenessRecognize(Context ctx, String name, String idNo, String agentCode,
                                             Callback<FaceResultData> callback) {
        FaceInputData input = new FaceInputData(name, idNo, agentCode, isFirstCall(agentCode));
        callLivenessRecognize(ctx, input,callback);
    }

    public static void callLivenessRecognize(Context ctx, FaceInputData input,
                                             Callback<FaceResultData> callback) {
        HashMap<String, Object> params = buildCallApiParams(input);
        callApi(ctx, params, input.reqid, callback);
    }

    public static void callLivenessRecognizeToken(Context ctx, String token, Callback<FaceResultData> callback) {
        FaceInputData input = null;
        callLivenessRecognize(ctx, input,callback);
    }

    private static void callApi(Context ctx, Map<String, Object> params, final String reqid,
                                final Callback<FaceResultData> callback) {
        BaiduRIM.getInstance().accessRimService(ctx, params, new RimServiceCallback() {
            @Override
            public void onResult(int code, Map<String, Object> map) {
                callback.onResult(FaceResultData.parserResult(map, reqid));
            }
        });
    }


    private static HashMap<String, Object> buildCallApiParams(FaceInputData input) {
        final HashMap<String, Object> params = new HashMap<>();
        params.put(FaceConstant.KEY_METHOD, input.method);
        params.put(FaceConstant.KEY_RECOGT_YPE, input.recogType);
        params.put(FaceConstant.KEY_SHOWGUIDEPAGE, input.showGuidePage);
        params.put(FaceConstant.KEY_REAL_NAME, input.name);
        params.put(FaceConstant.KEY_IDCARD_NO, input.idNo);
        params.put(FaceConstant.KEY_EXUID, input.exuid);
        params.put(FaceConstant.KEY_SP_PARAMS, buildSpParams(input.reqid));
        return params;
    }

    private static String buildSpParams(final String reqid) {
        StringBuilder builder = new StringBuilder();
        builder.append(FaceConstant.KEY_REQ_ID + "=" + reqid + "&");
        builder.append(FaceConstant.KEY_SP_NO + "=" + FaceConstant.SP_NO + "&");
        builder.append(FaceConstant.KEY_SIGN + "=" + buildSignStr(reqid));
        return builder.toString();
    }

    private static String buildSignStr(final String reqid) {
        StringBuilder builder = new StringBuilder();
        // KEY_REQ_ID、KEY_SP_NO  需要进行升序排列
        builder.append(FaceConstant.KEY_REQ_ID + "=" + reqid + "&");
        builder.append(FaceConstant.KEY_SP_NO + "=" + FaceConstant.SP_NO + "&");

        builder.append(FaceConstant.KEY_APPKEY + "=" + FaceConstant.APPKEY);
        return Md5Utils.toMD5(builder.toString());
    }


    private static boolean isFirstCall(String agentCode) {

        return true;
    }

}
