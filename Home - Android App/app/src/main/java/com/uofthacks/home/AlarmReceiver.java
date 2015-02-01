package com.uofthacks.home;

import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.LayoutInflater;
import android.content.Context;
import android.widget.RemoteViews;
import android.widget.Toast;

import com.github.lzyzsd.circleprogress.ArcProgress;

public class AlarmReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context arg0, Intent arg1) {
        // For our recurring task, we'll just display a message

        ConnectionDetector cd = new ConnectionDetector(arg0);
        boolean internet_status = cd.isConnectingToInternet();

        try {
            if (internet_status) {
                new AsyncTaskParseJson().execute();

                Log.d("here","here");

                try {
                    MainActivity  .getInstace().updateTheTextView(MainActivity.temp, MainActivity.sound, MainActivity.light);
                } catch (Exception e) {
                  }

            }
        }
        catch (Exception e) {
        }
    }
}