<?
namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class CallbackRequestDto
{
    #[Assert\NotBlank]
    public ?string $code = null; // Valeur par défaut à null

}
