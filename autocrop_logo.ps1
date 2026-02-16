Add-Type -AssemblyName System.Drawing

$inputPath = "d:\arfa fiorello\assets\logo_icon.png"
$outputPath = "d:\arfa fiorello\assets\logo_icon_cropped.png"

$bitmap = [System.Drawing.Bitmap]::FromFile($inputPath)

$minX = $bitmap.Width
$minY = $bitmap.Height
$maxX = 0
$maxY = 0

# Find the bounding box of non-white pixels
for ($y = 0; $y -lt $bitmap.Height; $y++) {
    for ($x = 0; $x -lt $bitmap.Width; $x++) {
        $pixel = $bitmap.GetPixel($x, $y)
        # Check if pixel is NOT white (assuming white background or transparent)
        if ($pixel.A -ne 0 -and ($pixel.R -lt 250 -or $pixel.G -lt 250 -or $pixel.B -lt 250)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

if ($maxX -ge $minX -and $maxY -ge $minY) {
    $rect = New-Object System.Drawing.Rectangle($minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1))
    $newBitmap = $bitmap.Clone($rect, $bitmap.PixelFormat)
    $newBitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newBitmap.Dispose()
    Write-Host "Cropped logo saved to $outputPath"
    Write-Host "New Dimensions: $($rect.Width)x$($rect.Height)"
}
else {
    Write-Host "No non-white pixels found."
}

$bitmap.Dispose()
