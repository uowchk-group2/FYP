package com.example.fypbackend.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;

public class JwtUsernameAndPasswordFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public JwtUsernameAndPasswordFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        try {

            UsernameAndPasswordAuthenticationRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), UsernameAndPasswordAuthenticationRequest.class);

            System.out.println(authenticationRequest.getUsername());
            System.out.println(authenticationRequest.getPassword());

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()
            );

            Authentication authenticate = authenticationManager.authenticate(authentication);
            return authenticate;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //After the attempt function above is successful
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        String key = "&Ws.z/%ARyS2DgSRg072J_(9oS(Dgoh3_o`c^1-c-Zh~63w71{k`d-Wm{zb+j}c";
        String token = Jwts.builder()
                .setSubject(authResult.getName()) //name of authed username
                .claim("authorities", authResult.getAuthorities()) //set payload
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusWeeks(2)))
                .signWith(Keys.hmacShaKeyFor(key.getBytes()))
                .compact();

        response.addHeader("Authorization", "Bearer "+token);
        response.getWriter().write("Bearer "+token);


    }
}
