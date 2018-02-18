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
	float offsetX = 0.0 + Factor1 * 0.1;
	float offsetY = 300.0;
	float frequency = 25.0;
	float amplitude = 50.0 + Factor0 * 100.0;
	float width = 10.0;
	float speed = 10.0;
	
	vec4 resultColour;
	
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
	const float offsetX = 400.0;
	const float offsetY = 300.0;
	const float frequency = 50.0;
	const float amplitude = 50.0;
	const float width = 40.0;
	const float speed = 10.0;
	
	vec4 texColour = texture2D(sampler2d, fTexCoord);
	vec4 resultColour;
	
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
	const float offsetX = 400.0;
	const float offsetY = 300.0;
	const float frequency = 50.0;
	const float amplitude = 50.0;
	const float width = 40.0;
	const float speed = 10.0;
	
	const float minSize = 50.0;
	const float maxSize = 100.0;
	const float curvature = 3.0;
	
	vec4 resultColour;
	
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

void main()                                 
{
	//WavePattern();
	//WaveShaderPattern();
	HeartPattern();
}




