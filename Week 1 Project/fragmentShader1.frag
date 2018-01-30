precision mediump float;

float r;
float g;
float b;
float a;

//0.66775
//0.33225

uniform float Factor0;

float RadToDegree(float degree)
{
	float answer = degree * 3.142 / 180.0;

	return answer;
}

void main()                                 
{
	float number0 = 1.0/3.0;
	float number1 = 2.0/3.0;

	r = (number1 * tan((gl_FragCoord.y) * 0.02 + 0.0 + Factor0) + number0);
	g = (number1 * tan((gl_FragCoord.y) * 0.02 + 2.1 + Factor0 * 2.0) + number0);
	b = (number1 * tan((gl_FragCoord.y) * 0.02 + 4.2 - Factor0) + number0);
	
	a = 1.0;
	
	gl_FragColor = vec4 ( r, g, b, a );
}

//Square
//float b = abs(tan(gl_FragCoord.x * 0.2 + gl_FragCoord.y * 0.2));

//Original
//float r = abs(cos(gl_FragCoord.x * 0.2) + sin(gl_FragCoord.y * 0.2));
//float g = abs(sin(gl_FragCoord.y * 0.1) + tan(gl_FragCoord.y * 0.1));
//float b = abs(tan(gl_FragCoord.x * 0.5 + gl_FragCoord.y * 0.5));

//Bonus
	/*if(gl_FragCoord.x > 0.0 && gl_FragCoord.x < 400.0
	&& gl_FragCoord.y > 0.0 && gl_FragCoord.y < 300.0)
	{
		r = 1.0;
		g = 0.0;
		b = 0.0;
		a = 1.0;
	} else if(gl_FragCoord.x > 400.0 && gl_FragCoord.x < 800.0
	&& gl_FragCoord.y > 300.0 && gl_FragCoord.y < 600.0) 
	{
		r = 1.0;
		g = 1.0;
		b = 1.0;
		a = 1.0;
	} else if(gl_FragCoord.y > 0.0 && gl_FragCoord.y < 300.0)
	{
		r = 0.0;
		g = 0.0;
		b = 1.0;
		a = 1.0;
	} else if(gl_FragCoord.y > 300.0 && gl_FragCoord.y < 600.0)
	{
		r = 0.0;
		g = 1.0;
		b = 0.0;
		a = 1.0;
	}*/