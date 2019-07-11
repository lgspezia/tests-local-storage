/**
 * Classe que representa um erro da aplicação
 */
export abstract class AppError {
    constructor(public status: number, public codigo: string, public mensagem: string) { }
}
