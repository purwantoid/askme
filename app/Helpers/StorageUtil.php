<?php

declare(strict_types=1);

namespace App\Helpers;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use Storage;

final class StorageUtil
{
    private static array $instances = [];

    private readonly Filesystem $filesystem;

    private function __construct()
    {
        $this->filesystem = Storage::disk('s3');
    }

    public static function getInstance(): self
    {
        $cls = self::class;
        if (!isset(self::$instances[$cls])) {
            self::$instances[$cls] = new self();
        }

        return self::$instances[$cls];
    }

    public function getFilesystem(): Filesystem
    {
        return $this->filesystem;
    }

    public function file(string $fileName, array|File|UploadedFile|null|string $file): bool|string
    {
        return $this->filesystem->put('files/' . $fileName, $file);
    }

    public function doc(string $fileName, array|File|UploadedFile|null|string $file): bool|string
    {
        return $this->filesystem->put('docs/' . $fileName, $file);
    }

    public function image(string $fileName, array|File|UploadedFile|null|string $file): bool|string
    {
        if (!$this->filesystem->exists('images/' . $fileName)) {
            return $this->filesystem->put('images/' . $fileName, $file);
        }

        return true;
    }
}
