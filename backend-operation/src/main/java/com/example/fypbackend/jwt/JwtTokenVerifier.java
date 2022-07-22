package com.example.fypbackend.jwt;

import com.google.common.base.Strings;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class JwtTokenVerifier extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if (Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")){
            //reject request
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.replace("Bearer ","");
        try {

            String key = "&Ws.z/%ARyS2DgSRg072J_(9oS(Dgoh3_o`c^1-c-Zh~63w71{k`d-Wm{zb+j}c";
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(key.getBytes()))
                    .build()
                    .parseClaimsJws(token);

            //Start evaluate body
            Claims body = claimsJws.getBody();
            String username = body.getSubject();
            List<Map<String, String>> authorities = (List<Map<String, String>>) body.get("authorities");

            Set<SimpleGrantedAuthority> authority = authorities.stream()
                    .map(m -> new SimpleGrantedAuthority(m.get("authority")))
                    .collect(Collectors.toSet());

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    authority
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("Ok");
        }catch (JwtException e){
            throw new IllegalStateException(String.format("Token cannot be trusted", token));
        }

        filterChain.doFilter(request,response);

    }
}
