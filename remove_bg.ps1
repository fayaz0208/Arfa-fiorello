Add-Type -AssemblyName System.Drawing

$inputPath = "d:\arfa fiorello\assets\logo.png"
$outputPath = "d:\arfa fiorello\assets\logo_transparent.png"

$bitmap = [System.Drawing.Bitmap]::FromFile($inputPath)
$newBitmap = New-Object System.Drawing.Bitmap($bitmap.Width, $bitmap.Height)
$graphics = [System.Drawing.Graphics]::FromImage($newBitmap)

# Setup color matrix for transparency
$matrix = New-Object System.Drawing.Imaging.ColorMatrix
$matrix.Matrix33 = 1.0 # Alpha

# Create image attributes
$attributes = New-Object System.Drawing.Imaging.ImageAttributes

# Set color key for transparency (white)
$attributes.SetColorKey([System.Drawing.Color]::White, [System.Drawing.Color]::White)

# Draw image with attributes
$graphics.DrawImage($bitmap, 
    (New-Object System.Drawing.Rectangle(0, 0, $bitmap.Width, $bitmap.Height)),
    0, 0, $bitmap.Width, $bitmap.Height,
    [System.Drawing.GraphicsUnit]::Pixel,
    $attributes)

$newBitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$bitmap.Dispose()
$newBitmap.Dispose()
$graphics.Dispose()

Write-Host "Transparent logo saved to $outputPath"
