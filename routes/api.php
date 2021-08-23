<?php

use App\Http\Controllers\AuthController;
use App\Models\Country;
use App\Models\Statistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('/countries', function (Request $request) {
        $params = $request->validate(
            ['date' => 'size:10|regex:/\d{4}-\d{2}-\d{2}/']
        );

        if ($request->has('date')) {
            $date = $params['date'];
        } else {
            $date = date('Y-m-d');
        }

        $data = Country::with(['statistic' => function ($q) use ($date) {
            $q->whereDate('created_at', $date);
        }])->get();

        return response($data, 200);
    });

    Route::get('/stats', function () {
        $stats = [
            'confirmed' => Statistic::sum('confirmed'),
            'recovered' => Statistic::sum('recovered'),
            'deaths' => Statistic::sum('death'),
        ];

        return response($stats, 200);
    });
});
