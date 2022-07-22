package com.example.fypbackend.security;

import com.example.fypbackend.auth.ApplicationUserService;
import com.example.fypbackend.jwt.JwtTokenVerifier;
import com.example.fypbackend.jwt.JwtUsernameAndPasswordFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import static com.example.fypbackend.security.ApplicationUserPermission.*;
import static com.example.fypbackend.security.ApplicationUserRole.*;

@Configuration
@EnableWebSecurity
@CrossOrigin
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final ApplicationUserService applicationUserService;

    @Autowired
    public ApplicationSecurityConfig(PasswordEncoder passwordEncoder,
                                     ApplicationUserService applicationUserService) {
        this.passwordEncoder = passwordEncoder;
        this.applicationUserService = applicationUserService;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
//                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll() //Permits your preflight request
                .antMatchers("/api/user/newUser","/api/user/exist/*","/").permitAll()
                .and()
                .addFilter(new JwtUsernameAndPasswordFilter(authenticationManager()))  //Add filter before accessing resources
                .addFilterAfter(new JwtTokenVerifier(), JwtUsernameAndPasswordFilter.class)
                .authorizeRequests()
//                .antMatchers("**","/**","/api/**/**").permitAll()
                .antMatchers("**", "/**", "/api/**/**").hasAnyRole(DISTRIBUTOR.name(),SUPPLIER.name(),DRIVER.name())
//                .antMatchers("/host", "/host/**").hasAnyRole(HOST.name())
//                .antMatchers("/staff", "/staff/**").hasAnyRole(STAFF.name())
                .anyRequest()
                .authenticated();
//                .and()
//                .formLogin();
//                .loginPage("/")
//                .defaultSuccessUrl( "/", true)
//                .failureUrl("/?error=true")
//                .and()
//                .rememberMe().tokenValiditySeconds((int) TimeUnit.DAYS.toSeconds(30)).key("somethingVerySecured");
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(applicationUserService);
        return provider;
    }

}

