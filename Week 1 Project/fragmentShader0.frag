precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Factor0;
uniform float Factor1;

//0.66775, 0.33225

void WavePattern()
{
	vec4 resultColour;
	
	float offsetX = 0.0 + Factor1 * 0.1;
	float offsetY = 300.0;
	float frequency = 25.0;
	float amplitude = 50.0 + Factor0 * 100.0;
	float width = 10.0;
	float speed = 10.0;
	
	float equation0 = amplitude * sin ((gl_FragCoord.x / frequency) - (offsetX * speed)) + offsetY - width;
	float equation1 = amplitude * sin ((gl_FragCoord.x / frequency) - (offsetX * speed)) + offsetY + width;
	
	// y = asin(fx - dx) + c;
	if(gl_FragCoord.y >= equation0 && gl_FragCoord.y <= equation1)
	{
		resultColour.r = 1.0;
		resultColour.g = Factor0 * 10.0;
		resultColour.b = 1.0;
		resultColour.a = 1.0;
	}
	else 
	{
		resultColour.r = 0.0;
		resultColour.g = 0.0;
		resultColour.b = 0.0;
		resultColour.a = 1.0;
	}
	
	gl_FragColor = resultColour;
}
	
// Linear interpolation
float lerp(float v0, float v1, float t)
{
	return ((1.0 - t) * v0) + (t * v1);
}

float invLerp(float v0, float v1, float v)
{
	return (v - v0) / (v1 - v0);
}

void WaveShaderPattern()
{
	vec4 texColour = texture2D(sampler2d, fTexCoord);
	vec4 resultColour;
	
	const float offsetX = 400.0;
	const float offsetY = 300.0;
	const float frequency = 50.0;
	const float amplitude = 50.0;
	const float width = 40.0;
	const float speed = 10.0;
	
	float equation0 = amplitude * sin((gl_FragCoord.x / frequency) - (offsetX + Factor0 * speed)) + offsetY;
	
	if(gl_FragCoord.y >= equation0 - width && gl_FragCoord.y <= equation0 + width)
	{
		resultColour.r = (1.0 - abs((invLerp(equation0 - width, equation0 + width, gl_FragCoord.y) - 0.5) + 2.0));
		resultColour.g = (1.0 - abs((invLerp(equation0 - width, equation0 + width, gl_FragCoord.y) - 0.5) + 2.0));
		resultColour.b = (1.0 - abs((invLerp(equation0 - width, equation0 + width, gl_FragCoord.y) - 0.5) + 2.0));
		resultColour.a = 1.0;
	}
	else 
	{	
		resultColour.r = 0.0;
		resultColour.g = 0.0;
		resultColour.b = 0.0;
		resultColour.a = 0.0;
	}
	
	gl_FragColor = texColour + resultColour;
}

void HeartPattern()
{
	vec4 resultColour;
	
	const float offsetX = 400.0;
	const float offsetY = 300.0;
	const float frequency = 50.0;
	const float amplitude = 50.0;
	const float width = 40.0;
	const float speed = 10.0;
	
	const float minSize = 50.0;
	const float maxSize = 100.0;
	const float curvature = 3.0;
	
	float dSize = (maxSize - minSize) * abs(sin(Factor0)) + minSize;
	float heartEquation0 = pow((gl_FragCoord.x - offsetX) / dSize, 2.0) + pow(((gl_FragCoord.y - offsetY) / dSize) - sqrt(abs((gl_FragCoord.x - offsetX) / dSize)), 2.0);

	if(heartEquation0 <= curvature)
	{
		resultColour.r = 1.0;
		resultColour.g = 1.0;
		resultColour.b = 1.0;
		resultColour.a = 1.0;
	}
	else 
	{	
		resultColour.r = 0.0;
		resultColour.g = 0.0;
		resultColour.b = 0.0;
		resultColour.a = 0.0;
	}
	
	gl_FragColor = resultColour;
}

void CirclePattern()
{
	vec4 texColour = texture2D(sampler2d, fTexCoord);
	vec4 combinedColour;
	
	combinedColour = texColour;
	vec4 resultColour;
	
	float r = 20.0 + Factor0 * 50.0;
	float ax = pow((gl_FragCoord.x - 400.0), 2.0);
	float ay = pow((gl_FragCoord.y - 300.0), 2.0);
	float a = ax + ay;
	float b = r * r;
	
	if ( a <= b )
	{
		resultColour.r = 1.0;
		resultColour.g = 1.0;
		resultColour.b = 1.0;
		resultColour.a = 1.0;
	}
	else
	{
		resultColour.r = 0.0;
		resultColour.g = 0.0;
		resultColour.b = 0.0;
		resultColour.a = 1.0;
	}
	
	gl_FragColor = resultColour;
}

void Everything()
{
	vec4 resultColour;
	
	// For wave pattern 0
	float offsetXWave0 = 0.0 + Factor1 * 0.1;
	float offsetYWave0 = 300.0;
	float frequencyWave0 = 25.0;
	float amplitudeWave0 = 50.0 + Factor0 * 50.0;
	float widthWave0 = 10.0;
	float speedWave0 = 10.0;
	
	float waveEquation0 = amplitudeWave0 * sin ((gl_FragCoord.x / frequencyWave0) - (offsetXWave0 * speedWave0)) + offsetYWave0 - widthWave0;
	float waveEquation1 = amplitudeWave0 * sin ((gl_FragCoord.x / frequencyWave0) - (offsetXWave0 * speedWave0)) + offsetYWave0 + widthWave0;
	
	// For wave pattern 1
	float offsetXWave1 = 0.0 - Factor1 * 0.1;
	float offsetYWave1 = 200.0 + Factor0 * 50.0;
	float frequencyWave1 = 25.0;
	float amplitudeWave1 = 50.0 + Factor0 * 10.0;
	float widthWave1 = 10.0;
	float speedWave1 = 10.0;
	
	float waveEquation2;
	float waveEquation3;
	
	waveEquation2 = amplitudeWave1 * sin ((gl_FragCoord.x / frequencyWave1) - (offsetXWave1 * speedWave1)) + offsetYWave1 - widthWave1;
	waveEquation3 = amplitudeWave1 * sin ((gl_FragCoord.x / frequencyWave1) - (offsetXWave1 * speedWave1)) + offsetYWave1 + widthWave1;
	 
	// For heart pattern 0
	float offsetXHeart0 = 400.0;
	float offsetYHeart0 = 300.0;
	float frequencyHeart0 = 50.0;
	float amplitudeHeart0 = 50.0;
	float widthHeart0 = 40.0;
	float speedHeart0 = Factor0 + 10.0;
	
	float minSizeHeart0 = 50.0;
	float maxSizeHeart0 = 100.0;
	float curvatureHeart0 = 3.0;
	
	float dSize = (maxSizeHeart0 - minSizeHeart0) * abs(sin(speedHeart0)) + minSizeHeart0;
	float heartEquation0 = pow((gl_FragCoord.x - offsetXHeart0) / dSize, 2.0) + pow(((gl_FragCoord.y - offsetYHeart0) / dSize) - sqrt(abs((gl_FragCoord.x - offsetXHeart0) / dSize)), 2.0);
		
	// y = asin(fx - dx) + c;
	if(gl_FragCoord.y >= waveEquation0 && gl_FragCoord.y <= waveEquation1)
	{
		resultColour.r = 1.0;
		resultColour.g = 0.8 - Factor0 * 10.0;
		resultColour.b = 1.0;
		resultColour.a = 1.0;
	}
	else if(gl_FragCoord.y >= waveEquation2 && gl_FragCoord.y <= waveEquation3)
	{
		resultColour.r = 1.0;
		resultColour.g = 0.8 - Factor0 * 10.0;
		resultColour.b = 1.0;
		resultColour.a = 1.0;
	}
	else if(heartEquation0 <= curvatureHeart0)
	{
		resultColour.r = 1.0;
		resultColour.g = 0.8 - Factor0 * 10.0;
		resultColour.b = 0.8 - Factor0 * 10.0;
		resultColour.a = 1.0;
	}
	else 
	{	
		resultColour.r = 0.0;
		resultColour.g = 0.0;
		resultColour.b = 0.0;
		resultColour.a = 0.0;
	}
	
	gl_FragColor = resultColour;
}

void main()                                 
{
	//WaveShaderPattern();
	//HeartPattern();
	//WavePattern();
	CirclePattern();
	//Everything();
}




