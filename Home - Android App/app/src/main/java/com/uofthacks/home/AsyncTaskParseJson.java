package com.uofthacks.home;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.view.View;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.github.lzyzsd.circleprogress.ArcProgress;

/**
 * Created by hp on 02-Jan-15.
 */

public class AsyncTaskParseJson extends AsyncTask<String, String, String> {

    private Context mContext;
    private View rootView;

    public AsyncTaskParseJson(){
        //this.mContext = context;
        //this.rootView = rootView;
    }

    static int temp = 0;
    static int light = 0;
    static int sound = 0;
    final String TAG = "AsyncTaskParseJson.java";

    // set your json string url here
    String Url = "http://techfest13.co.nf/temp.json";

    // contacts JSONArray
    JSONArray dataJsonArr = null;

    @Override
    protected void onPreExecute() {}

    @Override
    protected String doInBackground(String... arg0) {

        try {

            // instantiate our json parser
            JsonParser jParser = new JsonParser();

            // get json string from url
            JSONObject json = jParser.getJSONFromUrl(Url);

            // get the array of users
            dataJsonArr = json.getJSONArray("sensor");

            // loop through all users
            for (int i = 0; i < dataJsonArr.length(); i++) {

                JSONObject c = dataJsonArr.getJSONObject(i);

                // Storing each json item in variable
                temp = c.getInt("temperature");
                light = c.getInt("light");
                sound = c.getInt("sound");
                //version = version.toString();

                // show the values in our logcat
                Log.e(TAG, "temp: " + temp);
                Log.e(TAG, "sound: " + sound);
                Log.e(TAG, "light: " + light);

            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        MainActivity.temp = temp;

        if (light > 10) MainActivity.light = true;
        else MainActivity.light = false;
        if (sound > 10) MainActivity.sound = true;
        else MainActivity.sound = false;

        return null;
    }

    @Override
    protected void onPostExecute(String strFromDoInBg) {
    }
}
