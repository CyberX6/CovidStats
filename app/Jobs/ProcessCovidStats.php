<?php

namespace App\Jobs;

use App\Models\Country;
use App\Models\Statistic;
use Carbon\Carbon;
use Http;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessCovidStats implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $countryCode;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($countryCode)
    {
        $this->countryCode = $countryCode;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $date = date('Y-m-d');
        $response = Http::withHeaders([
                                          'x-rapidapi-key' => config('api.rapidApiKey'),
                                          'x-rapidapi-host' => config('api.rapidApiHost')
                                      ])->get(config('urls.fetchStats').'?code='.$this->countryCode.'&date='.$date);

        if ($response->ok()) {
            $response = $response->object()[0];
            $countryCode = $response->code;
            $countryId = Country::where('code', $countryCode)->first()->id;

            $existing = Statistic::whereRaw('DATE(created_at) = CURDATE() AND country_id = '.$countryId)->first();
            $data = [
                'confirmed' => $response->confirmed,
                'recovered' => $response->recovered,
                'death' => $response->deaths,
                'updated_at' => Carbon::now()
            ];

            if ($existing) {
                $existing->fill($data);
                $existing->save();
            } else {
                $data['country_id'] = $countryId;
                $data['created_at'] = date('Y-m-d');

                Statistic::insert($data);
            }
        }
    }
}
