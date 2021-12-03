<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/jokes", name="jokes")
 */
class JokeController extends AbstractController
{
    /**
     * @Route("", name="_category")
     */
    public function browseCategories(): Response
    {
        return $this->render('jokes/categories.html.twig', [
            'controller_name' => 'CategoryController',
        ]);
    }

    /**
     * @Route("/random", name="_random")
     */
    public function readRandomJoke(): Response
    {
        return $this->render('jokes/random_jokes.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }
}
