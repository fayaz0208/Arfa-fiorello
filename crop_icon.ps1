Add-Type -AssemblyName System.Drawing

$inputPath = "d:\arfa fiorello\assets\logo.png"
$outputPath = "d:\arfa fiorello\assets\logo_icon.png"

$image = [System.Drawing.Bitmap]::FromFile($inputPath)

# 640x640 image
# Crop top 480 pixels (approx 75%) to keep icon, remove text
$cropRect = New-Object System.Drawing.Rectangle(0, 0, 640, 480)
$croppedImage = $image.Clone($cropRect, $image.PixelFormat)

$croppedImage.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$image.Dispose()
$croppedImage.Dispose()

Write-Host "Cropped icon saved to $outputPath"
