package com.polysoft.nci.utils;

import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.BitmapFactory;
import android.util.Base64;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

public class BitmapUtil {


	public static String bitmapToString(Bitmap bitmap) {
		ByteArrayOutputStream baos = null;
		try {
			baos = new ByteArrayOutputStream();
			bitmap.compress(CompressFormat.PNG, 100, baos);
			return bitmapByteToString(baos.toByteArray());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != baos) {
				try {
					baos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return "";
	}
	
	public static String bitmapByteToString(byte[] bitmapBytes) {
		return Base64.encodeToString(bitmapBytes, Base64.NO_WRAP);
	}

	public static String readFileBitmapStr(String filePath) {
		File file = new File(filePath);
		if (!file.exists()) {
			return "";
		}
		Bitmap bitmap = BitmapFactory.decodeFile(filePath);
		String bitmapStr = BitmapUtil.bitmapToString(bitmap);
		bitmap.recycle();
		file.delete();
		return bitmapStr;
	}
	
}
