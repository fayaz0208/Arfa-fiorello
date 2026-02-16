Add-Type -AssemblyName System.Drawing

$imagePath = "d:\arfa fiorello\assets\logo.png"
$image = [System.Drawing.Image]::FromFile($imagePath)

Write-Host "Width: $($image.Width)"
Write-Host "Height: $($image.Height)"

$image.Dispose()
