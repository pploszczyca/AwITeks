package pl.edu.agh.awiteks_backend.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import pl.edu.agh.awiteks_backend.security.filters.FilterExceptionHandler;
import pl.edu.agh.awiteks_backend.security.filters.JwtAuthFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtAuthFilter jwtAuthFilter;
    private final FilterExceptionHandler filterExceptionHandler;

    @Autowired
    public SecurityConfig(JwtAuthFilter jwtAuthFilter, FilterExceptionHandler filterExceptionHandler) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.filterExceptionHandler = filterExceptionHandler;
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
                .csrf().disable();
    }
}
