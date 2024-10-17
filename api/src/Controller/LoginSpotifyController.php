<?

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController()]
class LoginSpotifyController extends AbstractController
{
    public function __construct(){}

    #[Route('/spotify/login',name: 'spotify_login')]
    public function __invoke(){
        $clientId = $_ENV['CLIENT_ID']; // ou getenv('CLIENT_ID');
        $redirectUri = $_ENV['REDIRECT_URI']; // ou getenv('REDIRECT_URI');
        $scope = 'user-read-private user-read-email';

        $authorizationUrl = 'https://accounts.spotify.com/authorize?' . http_build_query([
            'response_type' => 'code',
            'client_id' => $clientId,
            'redirect_uri' => $redirectUri,
            'scope' => $scope,
        ]);

        return $this->redirect($authorizationUrl);
    }
}
