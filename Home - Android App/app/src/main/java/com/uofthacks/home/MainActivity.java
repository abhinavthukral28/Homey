package com.uofthacks.home;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.ClipData;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;
import android.util.Log;
import android.widget.Toolbar;

import com.getpebble.android.kit.PebbleKit;
import com.getpebble.android.kit.PebbleKit.*;


import com.github.lzyzsd.circleprogress.ArcProgress;


public class MainActivity extends Activity {

    private PendingIntent pendingIntent;
    private AlarmManager manager;
    public static int temp = 0;
    public static boolean light = false;
    public static int sound = 0;
    private static MainActivity ins;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ins = this;
        setContentView(R.layout.activity_main);

        ArcProgress arc = (ArcProgress) findViewById(R.id.arc_progress);


        /*ConnectionDetector cd = new ConnectionDetector(getApplicationContext());
        boolean internet_status = cd.isConnectingToInternet(); */

        Intent alarmIntent = new Intent(this, AlarmReceiver.class);
        pendingIntent = PendingIntent.getBroadcast(this, 0, alarmIntent, 0);

        startAlarm(arc);

        /*try {
            if (internet_status) {
                new AsyncTaskParseJson(arc).execute();
            }
        }
        catch (Exception e) {
        } */
    }

    public static MainActivity getInstace()
    {
        return ins;
    }

    public void updateTheTextView(final int t, final int s, final boolean l) {
        MainActivity.this.runOnUiThread(new Runnable() {
            public void run() {
                ArcProgress arc = (ArcProgress) findViewById(R.id.arc_progress);
                arc.setProgress(t);

                ImageView light_image = (ImageView) findViewById(R.id.light_icon);
                if(l == true)
                    light_image.setImageResource(R.drawable.lightbulb_on);
                else
                    light_image.setImageResource(R.drawable.lightbulb_off);

                ImageView sound_image = (ImageView) findViewById(R.id.sound_icon);
                if(s < 10)
                    sound_image.setImageResource(R.drawable.sound_icon);
                else if (s < 20)
                    sound_image.setImageResource(R.drawable.layer4);
                else if (s < 30)
                    sound_image.setImageResource(R.drawable.layer3);
                else if (s < 40)
                    sound_image.setImageResource(R.drawable.layer2);
                else
                    sound_image.setImageResource(R.drawable.layer1);

                boolean connected = PebbleKit.isWatchConnected(getApplicationContext());
                Log.i(getLocalClassName(), "Pebble now is " + (connected ? "connected" : "not connected"));

                MenuItem menuItem = (MenuItem)findViewById(R.id.pebble_conn);
                if (connected)
                    menuItem.setIcon(getResources().getDrawable(R.drawable.pebble_on));
                else
                    menuItem.setIcon(getResources().getDrawable(R.drawable.pebble));

            }
        });
    }

    public void startAlarm(View view) {
        manager = (AlarmManager)getSystemService(Context.ALARM_SERVICE);
        int interval = 1000;

        manager.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), interval, pendingIntent);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        switch (item.getItemId()) {
            case R.id.action_settings:
                settings();
                return true;
            case R.id.pebble_conn:
                checkConn();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    public void settings()
    {
        Intent intent = new Intent(MainActivity.this, SettingsActivity.class);
        startActivity(intent);
    }

    public void checkConn()
    {
        Context context = getApplicationContext();
        boolean connected = PebbleKit.isWatchConnected(getApplicationContext());
        Log.i(getLocalClassName(), "Pebble is " + (connected ? "connected" : "not connected"));
        Toast.makeText(context, "Pebble is " + (connected ? "connected" : "not connected"), Toast.LENGTH_SHORT).show();
    }
}
