package pl.edu.agh.awiteks_backend.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import pl.edu.agh.awiteks_backend.security.UserDetailsServiceImp;
import pl.edu.agh.awiteks_backend.security.filters.FilterExceptionHandler;
import pl.edu.agh.awiteks_backend.security.filters.JwtAuthFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtAuthFilter jwtAuthFilter;
    private final FilterExceptionHandler filterExceptionHandler;
    private final UserDetailsServiceImp userDetailsServiceImp;

    @Autowired
    public SecurityConfig(JwtAuthFilter jwtAuthFilter, FilterExceptionHandler filterExceptionHandler, UserDetailsServiceImp userDetailsServiceImp) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.filterExceptionHandler = filterExceptionHandler;
        this.userDetailsServiceImp = userDetailsServiceImp;
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors()
                .and()
                .authorizeRequests()
                .anyRequest().permitAll() // jwtAuthFilter decides who gets in
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(filterExceptionHandler, ChannelProcessingFilter.class)
                .addFilterAfter(jwtAuthFilter, SecurityContextPersistenceFilter.class)
                .csrf().disable()
                .exceptionHandling();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceImp).passwordEncoder(new BCryptPasswordEncoder());
    }
}
