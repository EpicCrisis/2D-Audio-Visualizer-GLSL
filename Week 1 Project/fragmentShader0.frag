precision mediump float;
varying vec4 fPosition;
varying vec4 fColor;
varying vec2 fTexCoord;

uniform sampler2D sampler2d;
uniform float Factor0;
uniform float Factor1;
uniform float Factor2;
uniform float Factor3;
uniform float Factor4;
uniform float Factor5;
uniform float Factor6;

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

void MoreCirclePattern()
{
	vec2 positionMCirclePattern = (gl_FragCoord.xy * 2.0 - 500.0) / min(200.0, 200.0);
    vec3 dimColorSet = vec3(0.5, 1.0, 0.5);
	
    float f = 0.01;
	
    for(float i = 0.0; i < 6.0; i++)
	{
        float s = sin(Factor1 * 0.1 + i * 1.04719);
        float c = cos(Factor1 * 0.1 + i * 1.04719);
        f += Factor0 * 0.1 / abs(length(positionMCirclePattern + vec2(c, s)) -0.25 * abs(sin(Factor2)));
	}
	
    gl_FragColor += vec4(vec3(dimColorSet * f), 1.0);
}

void Everything()
{
	vec4 texColor = texture2D(sampler2d, fTexCoord);	
	vec4 resultColor;
	//vec4 combinedColor;
	//combinedColor = texColor;
	
	// For wave pattern 0, bottom wave
	float offsetXWave0 = 0.0 + Factor1 * 0.04;
	float offsetYWave0 = 50.0 + Factor0 * 30.0;;
	float frequencyWave0 = 60.0;
	float amplitudeWave0 = 30.0 + Factor0 * 3.0;
	float widthWave0 = 10.0;
	float speedWave0 = 10.0;
	
	float waveEquation0 = amplitudeWave0 * sin ((gl_FragCoord.x / frequencyWave0) - (offsetXWave0 * speedWave0)) + offsetYWave0 - widthWave0;
	float waveEquation1 = amplitudeWave0 * sin ((gl_FragCoord.x / frequencyWave0) - (offsetXWave0 * speedWave0)) + offsetYWave0 + widthWave0;
	
	// For wave pattern 1, middle wave
	float offsetXWave1 = 0.0 - Factor1 * 0.08;
	float offsetYWave1 = 100.0 + Factor0 * 20.0;
	float frequencyWave1 = 50.0;
	float amplitudeWave1 = 20.0 + Factor0 * 6.0;
	float widthWave1 = 10.0;
	float speedWave1 = 10.0;
	
	float waveEquation2;
	float waveEquation3;
	
	waveEquation2 = amplitudeWave1 * sin ((gl_FragCoord.x / frequencyWave1) - (offsetXWave1 * speedWave1)) + offsetYWave1 - widthWave1;
	waveEquation3 = amplitudeWave1 * sin ((gl_FragCoord.x / frequencyWave1) - (offsetXWave1 * speedWave1)) + offsetYWave1 + widthWave1;
	
	// For wave pattern 2, top wave
	float offsetXWave2 = 0.0 + Factor1 * 0.12;
	float offsetYWave2 = 150.0 + Factor0 * 10.0;
	float frequencyWave2 = 40.0;
	float amplitudeWave2 = 10.0 + Factor0 * 9.0;
	float widthWave2 = 10.0;
	float speedWave2 = 10.0;
	
	float waveEquation4;
	float waveEquation5;
	
	waveEquation4 = amplitudeWave2 * sin ((gl_FragCoord.x / frequencyWave2) - (offsetXWave2 * speedWave2)) + offsetYWave2 - widthWave2;
	waveEquation5 = amplitudeWave2 * sin ((gl_FragCoord.x / frequencyWave2) - (offsetXWave2 * speedWave2)) + offsetYWave2 + widthWave2;
	
	// For wave pattern 3, mouth wave
	float offsetXWave3 = 0.0;
	float offsetYWave3 = 350.0 + Factor0 * 10.0;
	float frequencyWave3 = 10.0;
	float amplitudeWave3 = 10.0 + Factor0 * 20.0;
	float widthWave3 = 5.0;
	float speedWave3 = 10.0;
	
	float waveEquation6;
	float waveEquation7;
	
	waveEquation6 = amplitudeWave3 * sin ((gl_FragCoord.x / frequencyWave3) - (offsetXWave3 * speedWave3)) + offsetYWave3 - widthWave3;
	waveEquation7 = amplitudeWave3 * sin ((gl_FragCoord.x / frequencyWave3) - (offsetXWave3 * speedWave3)) + offsetYWave3 + widthWave3;
	
	// For wave pattern 4, DNA wave
	float offsetXWave4 = 350.0 + Factor2 * 10.0;
	float offsetXWave4Other = 350.0 + 15.0 + Factor2 * 10.0;
	float offsetYWave4 = 300.0;
	float offsetYWave4Other = 300.0 + 59.7;
	float frequencyWave4 = 20.0;
	float amplitudeWave4 = 10.0;
	float widthWave4 = 5.0 + Factor0 * 10.0;
	float speedWave4 = 10.0 + Factor1;
	
	float waveEquation8;
	float waveEquation9;
	
	waveEquation8 = amplitudeWave4 * sin ((gl_FragCoord.y / frequencyWave4) - (offsetYWave4 - speedWave4)) + offsetXWave4 - widthWave4;
	waveEquation9 = amplitudeWave4 * sin ((gl_FragCoord.y / frequencyWave4) - (offsetYWave4Other - speedWave4)) + offsetXWave4Other + widthWave4;
	
	// For heart pattern 0, eye heart
	float offsetXHeart0 = 680.0;
	float offsetYHeart0 = 465.0;
	float speedHeart0 = 10.0;
	
	float minSizeHeart0 = 20.0;
	float maxSizeHeart0 = 30.0 + Factor0 * 25.0;
	float curvatureHeart0 = 3.0;
	
	float dSize = (maxSizeHeart0 - minSizeHeart0) * abs(sin(speedHeart0)) + minSizeHeart0;
	float heartEquation0 = pow((gl_FragCoord.x - offsetXHeart0) / dSize, 2.0) + pow(((gl_FragCoord.y - offsetYHeart0) / dSize) - sqrt(abs((gl_FragCoord.x - offsetXHeart0) / dSize)), 2.0);
	
	// For circle pattern 0, circle guarding heart
	float rInner0 = 65.0 + Factor0 * 20.0;
	float rOuter0 = 70.0 + Factor0 * 25.0;
	float circleCoord0X = 680.0 - Factor3 * 10.0;
	float circleCoord0Y = 465.0 + 14.5 + Factor2 * 5.0;
	
	float ax0 = pow((gl_FragCoord.x - circleCoord0X), 2.0);
	float ay0 = pow((gl_FragCoord.y - circleCoord0Y), 2.0);
	
	float a0 = ax0 + ay0;
	float b0 = rInner0 * rInner0;
	float c0 = rOuter0 * rOuter0;
	
	// For circle pattern 1, eye
	float rInner1 = 15.0 + Factor0 * 10.0;
	float rOuter1 = 20.0 + Factor0 * 10.0;
	float circleCoord1X = 540.0 + Factor3 * 10.0;
	float circleCoord1Y = 465.0 + Factor4 * 10.0;
	
	float ax1 = pow((gl_FragCoord.x - circleCoord1X), 2.0);
	float ay1 = pow((gl_FragCoord.y - circleCoord1Y), 2.0);
	
	float a1 = ax1 + ay1;
	float b1 = rInner1 * rInner1;
	float c1 = rOuter1 * rOuter1;
	
	// For circle pattern 2, circle out eye
	float rInner2 = 40.0 + Factor0 * 5.0;
	float rOuter2 = 50.0 + Factor0 * 15.0;
	float circleCoord2X = 540.0;
	float circleCoord2Y = 465.0;
	
	float ax2 = pow((gl_FragCoord.x - circleCoord2X), 2.0);
	float ay2 = pow((gl_FragCoord.y - circleCoord2Y), 2.0);
	
	float a2 = ax2 + ay2;
	float b2 = rInner2 * rInner2;
	float c2 = rOuter2 * rOuter2;
	
	// For circle pattern 3, sun circle
	float rInner3 = 50.0 + Factor0 * 50.0;
	float rOuter3 = 65.0 + Factor0 * 50.0;
	float circleCoord3X = 400.0 + Factor5 * 130.0;
	float circleCoord3Y = 200.0 + Factor6 * 130.0;
	
	float ax3 = pow((gl_FragCoord.x - circleCoord3X), 2.0);
	float ay3 = pow((gl_FragCoord.y - circleCoord3Y), 2.0);
	
	float a3 = ax3 + ay3;
	float b3 = rInner3 * rInner3;
	float c3 = rOuter3 * rOuter3;
	
	// Corner pattern
	float square = abs(tan(gl_FragCoord.x * 0.2 + gl_FragCoord.y * 0.2));
	
	// Vertical bar pattern
	float barPosX0 = 300.0 + Factor2 * 100.0;
	float barWidth0 = 10.0 + Factor0 * 20.0;
	
	// Tongue pattern
	float tonguePosX0 = 666.0 + Factor3 * 10.0 + Factor4 * 10.0;
	float tonguePosY0 = 350.0 - Factor0 * 20.0 - Factor2 * 10.0;
	float tongueWidth0 = 100.0;
	float tongueThickness0 = 50.0 - Factor2 * 10.0;
	float tongueEquation0 = (((gl_FragCoord.x - tonguePosX0) * (gl_FragCoord.x - tonguePosX0)) / tongueThickness0) + tonguePosY0;
	
	// Rectangle pattern
	float rectPosX0 = 300.0;
	float rectPosY0 = 150.0;
	float rectWidth0 = 20.0;
	float rectHeight0 = 20.0 + Factor0 * 100.0;
	
	// y = asin(fx - dx) + c;
	if(gl_FragCoord.y >= 0.0 && gl_FragCoord.y <= waveEquation1) // Bottom wave
	{
		resultColor.r = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;                                             
	}                                                                    
	else if(gl_FragCoord.y >= 0.0 && gl_FragCoord.y <= waveEquation3) // Middle wave
	{                                                                    
		resultColor.r = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;                                             
	}                                                                    
	else if(gl_FragCoord.y >= 0.0 && gl_FragCoord.y <= waveEquation5) // Top wave
	{                                                                    
		resultColor.r = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 0.02 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;
	}                                                                    
	else if(gl_FragCoord.y >= waveEquation6 && gl_FragCoord.y <= waveEquation7 && gl_FragCoord.x >= 425.0) // Mouth wave
	{                                                                    
		resultColor.r = ((2.0 / 3.0) * tan((gl_FragCoord.y + Factor0 + gl_FragCoord.x) * 0.02 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * tan((gl_FragCoord.y + Factor0 + gl_FragCoord.x) * 0.02 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * tan((gl_FragCoord.y + Factor0 + gl_FragCoord.x) * 0.02 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;
	}                                                              
	else if(gl_FragCoord.x >= waveEquation8 && gl_FragCoord.x <= waveEquation9) // DNA wave
	{                                                                    
		resultColor.r = ((2.0 / 3.0) * sin((gl_FragCoord.x) * 1.0 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * sin((gl_FragCoord.y) * 1.0 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * sin((gl_FragCoord.x) * 1.0 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;
	}
	else if(heartEquation0 <= curvatureHeart0 && heartEquation0 >= curvatureHeart0 / 2.0) // Heart outer
	{
		resultColor.r = abs((invLerp(curvatureHeart0 / 2.0, curvatureHeart0, heartEquation0)));
		resultColor.g = 0.0 + Factor0;
		resultColor.b = abs((invLerp(curvatureHeart0 / 2.0, curvatureHeart0, heartEquation0)));
		resultColor.a = 1.0;
	}
	else if(heartEquation0 < curvatureHeart0 / 2.0) // Heart inner
	{
		resultColor.r = 1.0;
		resultColor.g = 0.8 - Factor0;
		resultColor.b = 0.8 - Factor0;
		resultColor.a = 1.0;
	}
	else if(a0 >= b0 && a0 <= c0) // Circle guarding heart
	{
		resultColor.r = 0.8 - Factor0;
		resultColor.g = 0.8 - Factor0;
		resultColor.b = 1.0;
		resultColor.a = 1.0;
	}
	else if(a1 <= c1) // Eye
	{
		resultColor.r = 1.0;
		resultColor.g = 1.0;
		resultColor.b = 0.8 - Factor0;
		resultColor.a = 1.0;
	}
	else if(a2 >= b2 && a2 <= c2) // Outside eye
	{
		resultColor.r = 0.8 - Factor0;
		resultColor.g = 1.0;
		resultColor.b = 1.0;
		resultColor.a = 1.0;
	}
	else if(gl_FragCoord.x >= barPosX0 - barWidth0 && gl_FragCoord.x <= barPosX0 + barWidth0) // Vertical bar
	{
		resultColor.r = ((2.0 / 3.0) * tan((gl_FragCoord.y - gl_FragCoord.x) * 0.02 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * tan((gl_FragCoord.y - gl_FragCoord.x) * 0.02 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * tan((gl_FragCoord.y - gl_FragCoord.x) * 0.02 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;
	}
	else if(gl_FragCoord.y >= tongueEquation0 - tongueWidth0 && gl_FragCoord.y <= tongueEquation0 + tongueWidth0 && gl_FragCoord.y <= waveEquation7) // Tongue
	{
		resultColor.r = ((2.0 / 3.0) * sin((gl_FragCoord.x) * 0.005 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * sin((gl_FragCoord.x) * 0.005 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * sin((gl_FragCoord.x) * 0.005 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;
	}
	else if(a3 <= c3 && a3 >= c3 / 3.0) // Sun circle 1 outer
	{
		resultColor.r = abs((invLerp(c3, c3 / 3.0, a3)));
		resultColor.g = abs((invLerp(c3, c3 / 3.0, a3)));
		resultColor.b = 0.4;
		resultColor.a = 0.0;
	}
	else if(a3 < c3 / 3.0) // Sun circle 1 inner
	{
		resultColor.r = 1.0;
		resultColor.g = 1.0;
		resultColor.b = 0.6 - Factor0;
		resultColor.a = 1.0;
	}
	else if(gl_FragCoord.x >= rectPosX0 && gl_FragCoord.x <= rectPosX0 + rectWidth0 && gl_FragCoord.y >= rectPosY0 && gl_FragCoord.y <= rectPosY0 + rectHeight0) // Rectangle pattern
	{
		resultColor.r = ((2.0 / 3.0) * tan((gl_FragCoord.y) * 0.02 + 4.2 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.g = ((2.0 / 3.0) * tan((gl_FragCoord.y) * 0.02 + 0.0 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.b = ((2.0 / 3.0) * tan((gl_FragCoord.y) * 0.02 + 2.1 + Factor1 * 0.1) + (1.0 / 3.0));
		resultColor.a = 1.0;
	}
	else // Corner light
	{	
		resultColor.r = ((2.0 / 3.0) * sin(gl_FragCoord.y * 0.02 + 0.0 + Factor0 * 0.0018) + (1.0 / 3.0)) * sin(gl_FragCoord.x * Factor0 * 0.0018);
		resultColor.g = (sin(gl_FragCoord.y * 0.001 + Factor1 * 0.1) * sin(gl_FragCoord.x * 0.6)) - 0.8 + (Factor0 * 0.3);                                                                           
		resultColor.b = sin(gl_FragCoord.y * Factor0 * 0.0018) * sin(gl_FragCoord.x * Factor0 * 0.0018);
		resultColor.a = 0.0;
	}
	
	vec2 positionMCirclePattern = (gl_FragCoord.xy * 2.0 - 500.0) / min(300.0, 300.0);
    vec3 dimColorSet = vec3(0.2, 0.6, 0.2);
	
	float f = 0.01;
	
    for(float i = 0.0; i < 6.0; i++)
	{
        float s = sin(Factor3 * 0.6 + i * 1.04719);
        float c = cos(Factor3 * 0.6 + i * 1.04719);
        f += Factor0 * 0.1 / abs(length(positionMCirclePattern + vec2(c, s)) - 0.25 * abs(sin(Factor2)));
	}
	
	gl_FragColor = texColor + resultColor;
    gl_FragColor += vec4(vec3(dimColorSet * f), 1.0);
	//gl_FragColor = texture2D(sampler2d, fTexCoord);
}

void main()                                 
{
	//WaveShaderPattern();
	//HeartPattern();
	//WavePattern();
	//CirclePattern();
	//MoreCirclePattern();
	Everything();
}




