<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleManagementTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_view_roles_index()
    {
        $response = $this->actingAs($this->user)->get(route('roles.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('roles/Index'));
    }

    public function test_can_view_role_create_form()
    {
        $response = $this->actingAs($this->user)->get(route('roles.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('roles/Create'));
    }

    public function test_can_create_role()
    {
        $permission1 = Permission::create(['name' => 'test.permission.1']);
        $permission2 = Permission::create(['name' => 'test.permission.2']);

        $response = $this->actingAs($this->user)->post(route('roles.store'), [
            'name' => 'Test Role',
            'permissions' => [$permission1->id, $permission2->id],
        ]);

        $response->assertRedirect(route('roles.index'));
        $response->assertSessionHas('success', 'Role created successfully.');

        $this->assertDatabaseHas('roles', ['name' => 'Test Role']);

        $role = Role::where('name', 'Test Role')->first();
        $this->assertTrue($role->hasPermissionTo($permission1));
        $this->assertTrue($role->hasPermissionTo($permission2));
    }

    public function test_cannot_create_role_with_duplicate_name()
    {
        Role::create(['name' => 'Existing Role']);

        $response = $this->actingAs($this->user)->post(route('roles.store'), [
            'name' => 'Existing Role',
            'permissions' => [],
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    public function test_can_view_role_details()
    {
        $role = Role::create(['name' => 'Test Role']);
        $permission = Permission::create(['name' => 'test.permission']);
        $role->givePermissionTo($permission);

        $response = $this->actingAs($this->user)->get(route('roles.show', $role));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('roles/Show')
            ->has('role.permissions', 1)
        );
    }

    public function test_can_view_role_edit_form()
    {
        $role = Role::create(['name' => 'Test Role']);

        $response = $this->actingAs($this->user)->get(route('roles.edit', $role));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('roles/Edit'));
    }

    public function test_can_update_role()
    {
        $role = Role::create(['name' => 'Original Name']);
        $permission1 = Permission::create(['name' => 'test.permission.1']);
        $permission2 = Permission::create(['name' => 'test.permission.2']);

        $role->givePermissionTo($permission1);

        $response = $this->actingAs($this->user)->put(route('roles.update', $role), [
            'name' => 'Updated Name',
            'permissions' => [$permission2->id],
        ]);

        $response->assertRedirect(route('roles.index'));
        $response->assertSessionHas('success', 'Role updated successfully.');

        $role->refresh();
        $this->assertEquals('Updated Name', $role->name);
        $this->assertFalse($role->hasPermissionTo($permission1));
        $this->assertTrue($role->hasPermissionTo($permission2));
    }

    public function test_can_delete_role()
    {
        $role = Role::create(['name' => 'Test Role']);

        $response = $this->actingAs($this->user)->delete(route('roles.destroy', $role));

        $response->assertRedirect(route('roles.index'));
        $response->assertSessionHas('success', 'Role deleted successfully.');
        $this->assertDatabaseMissing('roles', ['id' => $role->id]);
    }

    public function test_role_name_is_required()
    {
        $response = $this->actingAs($this->user)->post(route('roles.store'), [
            'name' => '',
            'permissions' => [],
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    public function test_invalid_permissions_are_rejected()
    {
        $response = $this->actingAs($this->user)->post(route('roles.store'), [
            'name' => 'Test Role',
            'permissions' => [999], // Non-existent permission ID
        ]);

        $response->assertSessionHasErrors(['permissions.0']);
    }
}
