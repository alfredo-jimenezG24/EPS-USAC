package gt.gob.inacif.mant.health;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.Map;

@Path("/health")
public class HealthResource {
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Map<String, Object> health() {
    return Map.of("status","UP","service","inacif-backend");
  }
}