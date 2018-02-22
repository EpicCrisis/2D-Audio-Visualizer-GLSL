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
	vec4 resultColor;
	
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
		resultColor.r = 1.0;
		resultColor.g = Factor0 * 10.0;
		resultColor.b = 1.0;
		resultColor.a = 1.0;
	}
	else 
	{
		resultColor.r = 0.0;
		resultColor.g = 0.0;
		resultColor.b = 0.0;
		resultColor.a = 1.0;
	}
	
	gl_FragColor = resultColor;
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
	vec4 texColor = texture2D(sampler2d, fTexCoord);
	vec4 resultColor;
	
	const float offsetX = 400.0;
	const float offsetY = 300.0;
	const float frequency = 50.0;
	const float amplitude = 50.0;
	const float width = 40.0;
	const float speed = 10.0;
	
	float equation0 = amplitude * sin((gl_FragCoord.x / frequency) - (offsetX + Factor0 * speed)) + offsetY;
	
	if(gl_FragCoord.y >= equation0 - width && gl_FragCoord.y <= equation0 + width)
	{
		resultColor.r = (1.0 - abs((invLerp(equation0 - width, equation0 + width, gl_FragCoord.y) - 0.5) + 2.0));
		resultColor.g = (1.0 - abs((invLerp(equation0 - width, equation0 + width, gl_FragCoord.y) - 0.5) + 2.0));
		resultColor.b = (1.0 - abs((invLerp(equation0 - width, equation0 + width, gl_FragCoord.y) - 0.5) + 2.0));
		resultColor.a = 1.0;
	}
	else 
	{	
		resultColor.r = 0.0;
		resultColor.g = 0.0;
		resultColor.b = 0.0;
		resultColor.a = 0.0;
	}
	
	gl_FragColor = texColor + resultColor;
}

void HeartPattern()
{
	vec4 resultColor;
	
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
		resultColor.r = 1.0;
		resultColor.g = 1.0;
		resultColor.b = 1.0;
		resultColor.a = 1.0;
	}
	else 
	{	
		resultColor.r = 0.0;
		resultColor.g = 0.0;
		resultColor.b = 0.0;
		resultColor.a = 0.0;
	}
	
	gl_FragColor = resultColor;
}

void CirclePattern()
{
	vec4 texColor = texture2D(sampler2d, fTexCoord);
	vec4 combinedColor;
	
	combinedColor = texColor;
	vec4 resultColor;
	
	float r0 = 20.0 + Factor0 * 50.0;
	float r1 = 30.0 + Factor0 * 50.0;
	
	float ax = pow((gl_FragCoord.x - 400.0), 2.0);
	float ay = pow((gl_FragCoord.y - 300.0), 2.0);
	
	float a = ax + ay;
	float b = r0 * r0;
	float c = r1 * r1;
	
	if ( a >= b && a <= c)
	{
		resultColor.r = 1.0;
		resultColor.g = 1.0;
		resultColor.b = 1.0;
		resultColor.a = 1.0;
	}
	else
	{
		resultColor.r = 0.0;
		resultColor.g = 0.0;
		resultColor.b = 0.0;
		resultColor.a = 1.0;
	}
	
	gl_FragColor = resultColor;
}

void Everything()
{
	vec4 resultColor;
	vec4 texColor = texture2D(sampler2d, fTexCoord);	
	vec4 combinedColor;
	combinedColor = texColor;
	
	// For wave pattern 0
	float offsetXWave0 = 0.0 + Factor1 * 0.05;
	float offsetYWave0 = 50.0;
	float frequencyWave0 = 60.0;
	float amplitudeWave0 = 30.0 + Factor0 * 50.0;
	float widthWave0 = 10.0;
	float speedWave0 = 10.0;
	
	float waveEquation0 = amplitudeWave0 * sin ((gl_FragCoord.x / frequencyWave0) - (offsetXWave0 * speedWave0)) + offsetYWave0 - widthWave0;
	float waveEquation1 = amplitudeWave0 * sin ((gl_FragCoord.x / frequencyWave0) - (offsetXWave0 * speedWave0)) + offsetYWave0 + widthWave0;
	
	// For wave pattern 1
	float offsetXWave1 = 0.0 - Factor1 * 0.1;
	float offsetYWave1 = 100.0 + Factor0 * 50.0;
	float frequencyWave1 = 50.0;
	float amplitudeWave1 = 20.0 + Factor0 * 10.0;
	float widthWave1 = 10.0;
	float speedWave1 = 10.0;
	
	float waveEquation2;
	float waveEquation3;
	
	waveEquation2 = amplitudeWave1 * sin ((gl_FragCoord.x / frequencyWave1) - (offsetXWave1 * speedWave1)) + offsetYWave1 - widthWave1;
	waveEquation3 = amplitudeWave1 * sin ((gl_FragCoord.x / frequencyWave1) - (offsetXWave1 * speedWave1)) + offsetYWave1 + widthWave1;
	
	// For wave pattern 2
	float offsetXWave2 = 0.0 + Factor1 * 0.15;
	float offsetYWave2 = 150.0 + Factor0 * 50.0;
	float frequencyWave2 = 40.0;
	float amplitudeWave2 = 10.0 + Factor0 * 10.0;
	float widthWave2 = 10.0;
	float speedWave2 = 10.0;
	
	float waveEquation4;
	float waveEquation5;
	
	waveEquation4 = amplitudeWave1 * sin ((gl_FragCoord.x / frequencyWave2) - (offsetXWave2 * speedWave2)) + offsetYWave2 - widthWave2;
	waveEquation5 = amplitudeWave1 * sin ((gl_FragCoord.x / frequencyWave2) - (offsetXWave2 * speedWave2)) + offsetYWave2 + widthWave2;
	
	// For heart pattern 0
	float offsetXHeart0 = 680.0;
	float offsetYHeart0 = 465.0;
	float speedHeart0 = Factor0 + 10.0;
	
	float minSizeHeart0 = 20.0;
	float maxSizeHeart0 = Factor0 * 10.0 + 30.0;
	float curvatureHeart0 = 3.0;
	
	float dSize = (maxSizeHeart0 - minSizeHeart0) * abs(sin(speedHeart0)) + minSizeHeart0;
	float heartEquation0 = pow((gl_FragCoord.x - offsetXHeart0) / dSize, 2.0) + pow(((gl_FragCoord.y - offsetYHeart0) / dSize) - sqrt(abs((gl_FragCoord.x - offsetXHeart0) / dSize)), 2.0);
	
	// For circle pattern 0
	float r0 = 65.0 + Factor0 * 50.0;
	float r1 = 70.0 + Factor0 * 50.0;
	float circleCoordX = 680.0;
	float circleCoordY = 465.0 + 14.5;
	
	float ax = pow((gl_FragCoord.x - circleCoordX), 2.0);
	float ay = pow((gl_FragCoord.y - circleCoordY), 2.0);
	
	float a = ax + ay;
	float b = r0 * r0;
	float c = r1 * r1;
	
	// Random squares pattern
	float square = abs(tan(gl_FragCoord.x * 0.2 + gl_FragCoord.y * 0.2));
	
	resultColor.r = square;
	
	// y = asin(fx - dx) + c;
	if(gl_FragCoord.y >= 0.0 && gl_FragCoord.y <= waveEquation1)
	{
		resultColor.r = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;                                             
	}                                                                    
	else if(gl_FragCoord.y >= 0.0 && gl_FragCoord.y <= waveEquation3)    
	{                                                                    
		resultColor.r = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;                                             
	}                                                                    
	else if(gl_FragCoord.y >= 0.0 && gl_FragCoord.y <= waveEquation5)    
	{                                                                    
		resultColor.r = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;
	}
	else if(heartEquation0 <= curvatureHeart0)
	{
		resultColor.r = 1.0;
		resultColor.g = 0.8 - Factor0;
		resultColor.b = 0.8 - Factor0;
		resultColor.a = 1.0;
	}
	else if(a >= b && a <= c)
	{
		resultColor.r = 1.0;
		resultColor.g = 1.0;
		resultColor.b = 1.0;
		resultColor.a = 1.0;
	}
	else 
	{	
		resultColor.r = sin(gl_FragCoord.y * Factor0 * 0.0025) * sin(gl_FragCoord.x * Factor0 * 0.0025);
		resultColor.g = 0.0;                               
		resultColor.b = sin(gl_FragCoord.y * Factor0 * 0.0025) * sin(gl_FragCoord.x * Factor0 * 0.0025);
		resultColor.a = 0.0;
	}
	
	gl_FragColor = resultColor;
}

void main()                                 
{
	//WaveShaderPattern();
	//HeartPattern();
	//WavePattern();
	//CirclePattern();
	Everything();
}




