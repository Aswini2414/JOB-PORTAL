package com.security.services;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;

@Component
public class JWTUtils {
	
	private SecretKey Key;
    private  static  final long EXPIRATION_TIME = 86400000;  //24 hours
    
    public JWTUtils(){
        String secreteString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
        byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
        this.Key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }
    
    public String generateToken(UserDetails userDetails){
    	String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .orElse("EMPLOYEE");  // Default role is USER
    	
    	HashMap<String, Object> claims = new HashMap<>();
        claims.put("role", role);  // Add role to claims
        
        return Jwts.builder()
        		.setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }
    
    public  String generateRefreshToken(HashMap<String, Object> claims, UserDetails userDetails){
    	String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .orElse("USER");
    	claims.put("role", role);  // Add role to refresh token
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }
    
    public  String extractUsername(String token){
        return  extractClaims(token, Claims::getSubject);
    }
    
 // Extract role from token
    public String extractRole(String token) {
        return extractClaims(token, claims -> (String) claims.get("role"));
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction){
        
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(Key)
                .build();

        Claims claims = jwtParser.parseClaimsJws(token).getBody();
        return claimsTFunction.apply(claims);
    }

    public  boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public  boolean isTokenExpired(String token){
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }

    

}
