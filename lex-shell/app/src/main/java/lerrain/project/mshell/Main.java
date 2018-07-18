package lerrain.project.mshell;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.KeyEvent;

import com.alibaba.fastjson.JSONObject;
import com.polysoft.nci.interf.IActivity;
import com.polysoft.nci.interf.IActivityResult;

import java.util.HashMap;
import java.util.Map;


public class Main extends Activity implements IActivity
{
	Layers layers;
	Map<String, IActivityResult> cacheMap = new HashMap<String, IActivityResult>();
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		DisplayMetrics metrics = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(metrics);
		Ui.dp = metrics.density;
		Ui.width = metrics.widthPixels;
		Ui.height = metrics.heightPixels;
		
		super.onCreate(savedInstanceState);
		
		layers = new Layers(this);

		final Layer base = createBaseLayer();
		layers.setBaseLayer(base);
		
		this.setContentView(layers);
	}
//
//	private void initHtml()
//	{
//		AssetManager am = this.getAssets();
//
//		try (InputStream is = am.open("phone.html/template.phone.html"))
//		{
//			template = Common.stringOf(is, "utf-8");
//		}
//		catch (Exception e)
//		{
//			Log.e("mshell", e.toString());
//		}
//
//		try
//		{
//			loadHtml(am, "phone.html");
//			Log.i("mshell", pages.keySet().toString());
//		}
//		catch (Exception e)
//		{
//			Log.e("mshell", e.toString());
//		}
//	}
//
//	private void loadHtml(AssetManager am, String path) throws IOException
//	{
//		String[] files = am.list(path);
//		if (files.length > 0)
//		{
//			for (String str : files)
//				loadHtml(am, path + "/" + str);
//		}
//		else
//		{
//			if (path.endsWith(".phone.html"))
//			{
//				try (InputStream is = am.open(path))
//				{
//					String phone.html = Common.stringOf(is, "utf-8");
//					pages.put(path.substring(5, path.length() - 5), phone.html);
//				}
//				catch (Exception e)
//				{
//					Log.e("mshell", e.toString());
//				}
//			}
//		}
//
//	}
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		switch (keyCode) {
			case KeyEvent.KEYCODE_BACK:
				this.clickBack();
				break;
			default:
				break;
		}
		return false;
	}

	private void clickBack() {
		if (this.layers.getChildCount() > 2) {
			this.layers.home();
		} else if (this.layers.getChildCount() <= 2) {
			this.showExitAppDialog();
		}
	}

	private void showExitAppDialog() {
		DialogInterface.OnClickListener okListener = new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				finish();
				System.exit(0);
			}
		};
		AlertDialog.Builder builder = new AlertDialog.Builder(this, AlertDialog.THEME_HOLO_LIGHT);
		builder.setTitle("提示");
		builder.setMessage("\n是否退出应用？\n");
		builder.setNegativeButton("确定", okListener);
		builder.setPositiveButton("取消", null);
		builder.setCancelable(true);
		builder.create().show();
	}
	protected Layer createBaseLayer()
	{
		PageLayer layer = new PageLayer(this);
//		layer.openLocal("xinhua_lx/autograph_xh.html");
		layer.openLocal("home/login.html");
//		layer.openLocal("share/html/share.html");

		return layer;
	}

	public void stat(final String action)
	{
		new Thread(new Runnable()
		{
			@Override
			public void run()
			{
				JSONObject json = new JSONObject();
				json.put("userKey", layers.env.get("userKey"));
				json.put("action", action);

				Network.request("util/stat.json", json.toJSONString(), 1000);
			}
		}).start();
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		String key = String.valueOf(requestCode);
		IActivityResult iResult = this.cacheMap.get(key);
		if (null != iResult) {
			this.cacheMap.remove(key);
			iResult.onActivityResult(requestCode, resultCode, data);
		}
	}

	@Override
	public void startActivityForResult(Intent intent, int requestCode, IActivityResult iResult) {
		super.startActivityForResult(intent, requestCode);
		String key = String.valueOf(requestCode);
		this.cacheMap.put(key, iResult);
	}

	@Override
	public Activity getActivity() {
		return this;
	}
}
