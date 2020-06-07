#version 330 core
in vec3 va_Position;
in vec3 va_Normal;
in vec2 va_TexCoord;

out vec4 g_FragColor;

uniform sampler2D u_DiffuseTex;
uniform sampler2D u_NormalTex;
uniform sampler2D u_SpecularTex;
uniform vec4      u_Color;
uniform int       u_ColorBlendMode;

void main()
{
    vec4 texel = texture2D(u_DiffuseTex, va_TexCoord);
    
    // Discard colors
    switch (u_ColorBlendMode)
    {
        case 1: // CB_ADD: Add Colors
            g_FragColor = vec4((u_Color.r + texel.r)/2, (u_Color.g + texel.g)/2, (u_Color.b + texel.b)/2, (u_Color.a + texel.a)/2);
            break;
        case 2: // CB_MULT: Multiply Colors
            g_FragColor = vec4((u_Color.r * (1+texel.r))-1, (u_Color.g * (1+texel.g))-1, (u_Color.b * (1+texel.b))-1, (u_Color.a * (1+texel.a))-1);
            break;
        case 3: // CB_ALPHA: Override Texture Alpha Channel
            g_FragColor = vec4(texel.r, texel.g, texel.b, u_Color.a);
            break;
        case 4: // CB_COLOR_ONLY: Color Only
            g_FragColor = u_Color;
            break;
        default: // CB_DISCARD: Discard material colors
            g_FragColor = texel;
    }
}