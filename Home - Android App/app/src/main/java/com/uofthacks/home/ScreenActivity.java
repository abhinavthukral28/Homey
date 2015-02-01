package com.uofthacks.home;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.gc.materialdesign.widgets.ColorSelector;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by hp on 31-Jan-15.
 */
public class ScreenActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_screen);

         com.gc.materialdesign.views.Button btn = (com.gc.materialdesign.views.Button) findViewById(R.id.button);
        btn.setOnClickListener(
                new View.OnClickListener()
                {
                    public void onClick(View view)
                    {
                        EditText tv = (EditText) findViewById(R.id.edit);
                        new MyAsyncTask2().execute(tv.getText().toString());
                    }
                }
        );
    }


    private class MyAsyncTask2 extends AsyncTask<String, Integer, Double>{

        @Override
        protected Double doInBackground(String... params) {
            // TODO Auto-generated method stub
            postData(params[0]);
            return null;
        }

        protected void onPostExecute(Double result){
            Toast.makeText(getApplicationContext(), "Preference updated", Toast.LENGTH_SHORT).show();
        }
        protected void onProgressUpdate(Integer... progress){
        }

        public void postData(String data) {
            Log.d("Value", "Value: " + data);
            Context mAppContext = getApplicationContext();
            TelephonyManager tMgr = (TelephonyManager)mAppContext.getSystemService(Context.TELEPHONY_SERVICE);
            String mPhoneNumber = tMgr.getLine1Number();

            HttpClient httpClient = new DefaultHttpClient();
            HttpPost httpPost = new HttpPost("http://142.1.249.219:8080/api/lcd");
            Log.d("Value", "Value: " + data);
            httpPost.setHeader("Content-type", "application/json");
            httpPost.setHeader("Accept", "application/json");
            JSONObject obj = new JSONObject();
            try {
                obj.put("text", String.valueOf(data));
                httpPost.setEntity(new StringEntity(obj.toString(), "UTF-8"));
            } catch (Exception e) {

            }

            //making POST request.
            try {
                HttpResponse response = httpClient.execute(httpPost);
                // write response to log
                Log.d("Http Post Response:", response.toString());
            } catch (ClientProtocolException e) {
                // Log exception
                e.printStackTrace();
            } catch (IOException e) {
                // Log exception
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }

}