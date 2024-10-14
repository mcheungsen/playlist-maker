<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MyEntityRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MyEntityRepository::class)]
#[ApiResource]
class MyEntity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $my_property = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMyProperty(): ?string
    {
        return $this->my_property;
    }

    public function setMyProperty(string $my_property): static
    {
        $this->my_property = $my_property;

        return $this;
    }
}
