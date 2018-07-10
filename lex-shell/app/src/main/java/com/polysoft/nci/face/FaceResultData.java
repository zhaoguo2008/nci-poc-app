package com.polysoft.nci.face;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Thinkpad on 2018/7/8.
 */

public class FaceResultData {
    /** 错误信息Code码*/
    private final String errorCode;
    /** 错误信息*/
    private final String errorMsg;

    private String faceid;
    private String isfake;
    /** 活体通过状态查询凭证*/
    private String callbackkey;
    /** 裁剪之后的图片 base64之后的String*/
    private String faceimage;
    /** 裁剪之后图片对应的签名*/
    private String imgdigests;
    /** 未裁剪的图片，base64之后的String*/
    private String originimage;
    /** 调用人脸识别时的请求流水号*/
    private String reqid;

    public FaceResultData(String errorCode, String errorMsg) {
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }

    private FaceResultData() {
        this.errorCode = null;
        this.errorMsg = null;
    }


    public static FaceResultData parserResult(Map<String, Object> result, String reqid) {
        String code = String.valueOf(result.get("retCode"));
        String message = (String) result.get("retMsg");

        if (!"0".equals(code)) {
            return new FaceResultData(code, message);
        }
        String resultValue = (String) result.get("result");
        try {
            JSONObject json = new JSONObject(resultValue);
            FaceResultData data = new FaceResultData();
            data.reqid = reqid;
//            data.faceid = json.optString("faceid");
//            data.isfake = json.optString("isfake");
//            data.imgdigests = json.optString("imgdigests");
//            data.faceimage = json.optString("faceimage");
//            data.originimage = json.optString("originimage");
            data.callbackkey = json.optString("callbackkey");
            return data;
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return new FaceResultData("-1000", "数据解解析失败");
    }

}
