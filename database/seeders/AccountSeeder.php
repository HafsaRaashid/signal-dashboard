<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Account;
use App\Models\Signal;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accountNames = [
        'Acme Corp',
        'Globex',
        'Initech',
        'Umbrella',
        'Hooli'
        ];

        foreach($accountNames as $accountName){

            $account = Account::create([
                'name' => $accountName
            ]);

            $account->signals()->createMany([
                ['type' => 'web_visit', 'status' => 'active',   'payload' => ['page' => 'pricing']],
                ['type' => 'intent',    'status' => 'active',   'payload' => ['keyword' => 'crm tools']],
                ['type' => 'linkedin',  'status' => 'archived', 'payload' => ['campaign' => 'b2b outreach']],
            ]);
        }
    }
}
