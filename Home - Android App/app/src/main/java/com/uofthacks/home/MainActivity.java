package com.uofthacks.home;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import com.github.lzyzsd.circleprogress.ArcProgress;


public class MainActivity extends Activity {

    private PendingIntent pendingIntent;
    private AlarmManager manager;
    public static int temp = 0;
    public static boolean light = false;
    public static boolean sound = false;
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

    public static MainActivity  getInstace()
    {
        return ins;
    }

    public void updateTheTextView(final int t, final boolean s, final boolean l) {
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
                if(s == true)
                    sound_image.setImageResource(R.drawable.sound_on);
                else
                    sound_image.setImageResource(R.drawable.sound_off);
            }
        });
    }


    public void startAlarm(View view) {
        manager = (AlarmManager)getSystemService(Context.ALARM_SERVICE);
        int interval = 5000;

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
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
