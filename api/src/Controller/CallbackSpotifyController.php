<?
namespace App\Controller;

use App\Dto\CallbackRequestDto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;
class CallbackSpotifyController extends AbstractController
{
    public function __construct(
        public HttpClientInterface $client,
        public string $clientId = "",
        public string $clientSecret = ""
    ) {
    }

    #[Route('/spotify/callback', name: 'spotify_callback', methods: ['POST'])]
    public function __invoke(#[MapRequestPayload] CallbackRequestDto $callbackRequestDto): JsonResponse
    {
        $response = $this->client->request(
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            options: [
                'headers' => [
                    'Authorization'=>'Basic '.(base64_encode($this->clientId.':'.$this->clientSecret)),
                    'Content-Type' => 'application/x-www-form-urlencoded',
                ],
                'body' => [
                    'grant_type' => 'authorization_code',
                    'code' => $callbackRequestDto->code,
                    'redirect_uri'=> 'http://localhost:3000/callback'

                ],
            ]
        );

        return new JsonResponse($response->toArray(), $response->getStatusCode());
    }
}
