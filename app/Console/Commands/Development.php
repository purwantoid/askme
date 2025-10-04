<?php

namespace App\Console\Commands;

use App\Contracts\CreatesTeams;
use App\Models\User;
use Illuminate\Console\Command;

class Development extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:development';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $user = User::find(1);
//        $team = app(CreatesTeams::class)->create($user, [
//            'name' => 'Development Team',
//        ]);
//        $this->info('Team created successfully.'.$team->name);

        $memberTeams = $user->teams();
        dd($memberTeams);

        $currentTeam = $user->currentTeam;
        $this->info('Current team: '.$currentTeam->name);
    }
}
