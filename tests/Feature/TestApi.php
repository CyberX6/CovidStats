<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TestApi extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_without_json_header()
    {
        $response = $this->get('/api/countries');

        $response->assertStatus(500);
    }

    public function test_with_json_header_no_auth()
    {
        $response = $this->get('/api/countries', ['Accept' => 'application/json']);

        $response->assertStatus(401);
    }

    public function test_with_json_header_auth()
    {
        $response = $this->get('/api/countries', [
           'Accept' => 'application/json',
           'Authorization' => 'Bearer 7|1umuJIOMdGVANw9NHPnVS3tJvLMTMw7oEblUycmt'
        ]);

        $response->assertStatus(200);
    }
}
