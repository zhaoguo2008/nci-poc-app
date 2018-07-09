package com.polysoft.nci.face;

/**
 * Created by Thinkpad on 2018/7/7.
 */

public class FaceInputData {
    /** 调用方法名*/
    public final String method = "startLivenessRecognize";
    /** 姓名*/
    public final String name;
    /** 身份证号*/
    public final String idNo;
    /** 是否显示引导页*/
    public final String showGuidePage;
    /** 业务员账号*/
    public final String exuid;
    /** 请求订单流水号*/
    public final String reqid;
    /** 调用类型*/
    public final String recogType = "certinfo";


    public FaceInputData(String name, String idNo, String agentCode, boolean isFirstCallApi) {
        this.name = name;
        this.idNo = idNo;
        this.exuid = agentCode;
        this.showGuidePage = isFirstCallApi ? "1" : "0";
        this.reqid = String.valueOf(System.currentTimeMillis());
    }
}
