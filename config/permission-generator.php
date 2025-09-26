<?php

declare(strict_types=1);

return [
    'generator' => [

        'guard_names' => [
            'web',
            'api',
        ],

        'permission_affixes' => [

            /*
             * Permissions Aligned with Policies.
             * DO NOT change the keys unless the genericPolicy.stub is published and altered accordingly
             */
            'viewAnyPermission' => 'view-any',
            'viewPermission' => 'view',
            'createPermission' => 'create',
            'updatePermission' => 'update',
            'deletePermission' => 'delete',
            'deleteAnyPermission' => 'delete-any',
            'replicatePermission' => 'replicate',
            'restorePermission' => 'restore',
            'restoreAnyPermission' => 'restore-any',
            'reorderPermission' => 'reorder',
            'forceDeletePermission' => 'force-delete',
            'forceDeleteAnyPermission' => 'force-delete-any',
        ],

        /*
         * returns the "name" for the permission.
         *
         * $permission which is an iteration of [permission_affixes] ,
         * $model The model to which the $permission will be concatenated
         *
         * Eg: 'permission_name' => 'return $permissionAffix . ' ' . Str::kebab($modelName),
         *
         * Note: If you are changing the "permission_name" , It's recommended to run with --clean to avoid duplications
         */
        'permission_name' => 'return $permissionAffix . \' \' . $modelName;',

        /*
         * Permissions will be generated for the models associated with the respective Filament Resources
         */
        'discover_models_through_filament_resources' => false,

        /*
         * Include directories which consists of models.
         */
        'model_directories' => [
            app_path('Models'),
            // app_path('Domains/Forum')
        ],

        /*
         * Define custom_models
         */
        'custom_models' => [
            //
        ],

        /*
         * Define excluded_models
         */
        'excluded_models' => [
            //
        ],

        'excluded_policy_models' => [
            App\Models\User::class,
        ],

        /*
         * Define any other permission that should be synced with the DB
         */
        'custom_permissions' => [
            // 'view-log'
        ],

        'user_model' => App\Models\User::class,

        'user_model_class' => 'User',

        'policies_namespace' => 'App\Policies',
    ],
];
