package pl.edu.agh.awiteks_backend.security.filters;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.DefaultCorsProcessor;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;
import pl.edu.agh.awiteks_backend.security.UnauthorizedException;

@Component
public class FilterExceptionHandler extends OncePerRequestFilter {

    private final ApplicationContext context;

    @Autowired
    public FilterExceptionHandler(ApplicationContext context) {
        this.context = context;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) {
        try {
            filterChain.doFilter(request, response);
        } catch (UnauthorizedException unauthorizedException) {
            printExceptionAndSetResponsesHeadersAndStatus(unauthorizedException,
                    response, HttpServletResponse.SC_UNAUTHORIZED);
        } catch (Exception exception) {
            printExceptionAndSetResponsesHeadersAndStatus(exception, response,
                    HttpServletResponse.SC_FORBIDDEN);
        } finally {
            addCorsHeaders(request, response);
        }
    }

    private void printExceptionAndSetResponsesHeadersAndStatus(
            Exception exception, HttpServletResponse response, int httpStatus) {
        exception.printStackTrace();

        response.setHeader(HttpHeaders.CONTENT_TYPE,
                MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(httpStatus);
    }

    private void addCorsHeaders(HttpServletRequest request,
                                HttpServletResponse response) {
        try {
            // if exception (such as UnauthorizedException thrown by JWTFilter) is thrown
            // filter chain doesn't add cors headers by default, and we get cors errors in the browser
            new DefaultCorsProcessor().processRequest(
                    context.getBean(HandlerMappingIntrospector.class)
                            .getCorsConfiguration(request),
                    request,
                    response
            );
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
