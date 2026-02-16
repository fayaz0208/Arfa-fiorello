Add-Type -AssemblyName System.Drawing

$inputPath = "d:\arfa fiorello\assets\logo.png"
$outputPath = "d:\arfa fiorello\assets\logo_icon.png"

$bitmap = [System.Drawing.Bitmap]::FromFile($inputPath)

# Define crop area (Top 70% of the image)
$cropHeight = [Math]::Floor($bitmap.Height * 0.70)
$rect = New-Object System.Drawing.Rectangle(0, 0, $bitmap.Width, $cropHeight)

$newBitmap = $bitmap.Clone($rect, $bitmap.PixelFormat)

$newBitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$bitmap.Dispose()
$newBitmap.Dispose()

Write-Host "Cropped logo saved to $outputPath"
