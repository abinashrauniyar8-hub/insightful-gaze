$baseUrl = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/"
$outputDir = "public\models"
if (!(Test-Path -Path $outputDir)) {
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

$models = @(
    "tiny_face_detector_model-weights_manifest.json",
    "tiny_face_detector_model-shard1",
    "face_landmark_68_model-weights_manifest.json",
    "face_landmark_68_model-shard1",
    "face_recognition_model-weights_manifest.json",
    "face_recognition_model-shard1",
    "face_recognition_model-shard2",
    "face_expression_model-weights_manifest.json",
    "face_expression_model-shard1",
    "age_gender_model-weights_manifest.json",
    "age_gender_model-shard1"
)

foreach ($model in $models) {
    $url = $baseUrl + $model
    $output = Join-Path $outputDir $model
    Write-Host "Downloading $model from $url..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing
        Write-Host "Finished $model"
    }
    catch {
        Write-Host "Error downloading $model : $_"
        exit 1
    }
}
Write-Host "All models downloaded successfully!"
