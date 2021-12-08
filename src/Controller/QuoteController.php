<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/quotes", name="quotes")
 */
class QuoteController extends AbstractController
{
    /**
     * @Route("/random", name="_random")
     */
    public function browseQuotes(): Response
    {
        return $this->render('quotes/random.html.twig', [
            'controller_name' => 'QuoteController',
        ]);
    }

    /**
     * @Route("/categories", name="_categories")
     */
    public function browseCategories(): Response
    {
        return $this->render('quotes/categories.html.twig', [
            'controller_name' => 'QuoteController',
        ]);
    }
}
